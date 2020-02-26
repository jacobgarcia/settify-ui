import axios from 'axios';
import store from 'store';
import queryString from 'query-string';

const SETTIFY_TOKEN_NAME = 'spotifyToken';

const baseURL = process.env.REACT_APP_API_URL;

const handleUnauthorized = ({ status }) => {
  if (status === 401) {
    store.remove(SETTIFY_TOKEN_NAME);
    window.location.reload();
  }

  if (status === 403) {
    throw new Error('Forbidden');
  }

  throw new Error('Unexpected server error');
};

const request = async ({
  url,
  data,
  method,
  skipAuth = false,
  isFormPost = false,
  isFile = false,
}) => {
  const contentType = isFormPost
    ? 'application/x-www-form-urlencoded'
    : 'application/json';

  const headers = { 'Content-Type': contentType };

  if (!skipAuth) {
    headers.Authorization = `Bearer ${store.get(SETTIFY_TOKEN_NAME).token}`;
  }

  try {
    let responseType = 'json';
    if (isFormPost) {
      responseType = 'arraybuffer';
    } else if (isFile) {
      responseType = 'blob';
    }

    const response = await axios({
      baseURL,
      url,
      headers,
      data: isFormPost ? queryString.stringify(data) : data,
      method: method || (data ? 'post' : 'get'),
      responseType,
    });

    if (isFormPost) return response;

    return response.data;
  } catch (error) {
    const { status, data: message } = error.response;

    return handleUnauthorized({ status, message, reload: !skipAuth });
  }
};

const Spotify = {
  GetPlaylists: (offset) => request({ url: `/playlists?offset=${offset}` }),
  GetIntersection: (firstPlaylist, secondPlaylist) =>
    request({
      url: `/intersection?firstPlaylist=${firstPlaylist}&secondPlaylist=${secondPlaylist}`,
    }),
  GetUnion: (firstPlaylist, secondPlaylist) =>
    request({
      url: `/union?firstPlaylist=${firstPlaylist}&secondPlaylist=${secondPlaylist}`,
    }),
  GetProfile: () => request({ url: '/me' }),
};

export default {
  Spotify,
};
