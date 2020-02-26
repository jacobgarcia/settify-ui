import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store';

import { Notify } from '@credijusto/ui-components';
import API from 'api';

const AuthContext = React.createContext();
export const SPOTIFY_TOKEN = 'spotifyToken';
export const TOKEN_EXPIRATION = 'tokenExpiration';
export const NAME = 'name';
export const EMAIL = 'email';
export const ID = 'id';
export const IMAGE = 'image';

/**
 * Returns the user profile from the local storage
 * @returns {Object}
 */
const getProfile = () => {
  const name = store.get(NAME);
  const email = store.get(EMAIL);
  const image = store.get(IMAGE);
  return {
    name,
    email,
    image,
  };
};

const setProfile = (name, email, id, image) => {
  store.set(NAME, name);
  store.set(EMAIL, email);
  store.set(ID, id);
  store.set(IMAGE, image);
};

export const AuthProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(!!store.get(SPOTIFY_TOKEN));

  /**
   * Used to know if the user role is being retrieved
   * initialized in true due we need to ensure that
   * no initial render is made without that information
   */
  const [isLoading, setIsLoading] = useState(true);

  const setToken = (tokenData) => {
    store.set(SPOTIFY_TOKEN, tokenData);
    if (tokenData) setHasToken(true);
  };

  const authenticate = async (tokenData) => {
    try {
      // Then set the token to avoid errors in expected values
      setToken(tokenData);
      // Then make a call to the API to get the user information
      const {
        display_name: name,
        id,
        email,
        images,
      } = await API.Spotify.GetProfile();
      setProfile(name, email, id, images);
    } catch (error) {
      Notify.error('Ocurrió un error en el servidor al iniciar sesión.');
    }
  };

  const getToken = () => store.get(SPOTIFY_TOKEN);

  const removeSession = () => {
    store.remove(SPOTIFY_TOKEN);
    store.remove(NAME);
    store.remove(EMAIL);

    setHasToken(false);
  };

  /**
   * This effect runs whenever the user logs in or logs out
   * is used to check expiration of the token
   */
  useEffect(
    () => {
      if (hasToken) {
        const { expiration } = getToken();
        if (Date.now() > expiration) {
          removeSession();
        }
      } else {
        setIsLoading(false);
      }
    },
    [hasToken]
  );

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        hasToken,
        getProfile,
        getToken,
        removeSession,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
