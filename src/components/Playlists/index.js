import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppTitle,
  Card,
  ViewLoader,
  Notify,
  withRouter,
  Box,
} from '@credijusto/ui-components';

import Checkbox from 'components/Checkbox';
import Table from 'components/Table';
import Success from 'components/Success';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import API from 'api';
import { intersect } from 'api/spotify';

const ITEMS_PER_PAGE = 20;

const Playlists = ({ queryParams }) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [success, setSuccess] = useState({});
  const [failure, setFailure] = useState(false);
  const [responseTime, setResponseTime] = useState(0);

  const handleChange = (value, name) => {
    if (value) {
      setSelectedRows((state) => [...state, name]);
    }
    if (!value) {
      setSelectedRows((state) => state.filter((e) => e !== name));
    }
  };

  const columns = [
    {
      key: 'check',
      label: '',
      cellRender: (check) => {
        const defaultValue = selectedRows.includes(check);
        return (
          <Checkbox
            name={check}
            defaultValue={defaultValue}
            onChange={(value, name) => handleChange(value, name)}
            disabled={selectedRows.length >= 2 && !defaultValue}
          />
        );
      },
    },
    {
      linkTo: 'https://open.spotify.com/playlist/:id',
      key: 'name',
      label: 'Name',
    },
    {
      key: 'owner',
      label: 'Owner',
    },
    {
      key: 'scope',
      label: 'Scope',
    },
    {
      key: 'tracks',
      label: 'Tracks',
    },
  ];

  const getData = async () => {
    try {
      const { page } = queryParams;
      const offset = ITEMS_PER_PAGE * ((parseInt(page, 10) || 1) - 1);
      const { items, total } = await API.Spotify.GetPlaylists(offset);
      setData(items);
      setTotal(total);
    } catch (error) {
      Notify.error('An error occured while getting the playlists');
    } finally {
      setLoading(false);
    }
  };

  const getIntersection = async () => {
    try {
      setLoading(true);
      const [firstPlaylist, secondPlaylist] = selectedRows;
      const startTime = Date.now();
      const intersectionData = await API.Spotify.GetIntersection(
        firstPlaylist,
        secondPlaylist
      );
      const endTime = Date.now();
      const time = endTime - startTime;
      setResponseTime(time);
      if (intersectionData) {
        setSuccess(intersectionData);
      } else {
        setFailure(true);
      }
    } catch (error) {
      Notify.error('An error occured while intersecting the playlists');
    } finally {
      setLoading(false);
    }
  };

  const getIntersectionJS = async () => {
    try {
      setLoading(true);
      const [firstPlaylist, secondPlaylist] = selectedRows;
      const startTime = Date.now();
      const intersectionData = await intersect(firstPlaylist, secondPlaylist);
      const endTime = Date.now();
      const time = endTime - startTime;
      setResponseTime(time);
      if (intersectionData) {
        setSuccess(intersectionData);
      } else {
        setFailure(true);
      }
    } catch (error) {
      Notify.error('An error occured while intersecting the playlists');
    } finally {
      setLoading(false);
    }
  };

  const getUnion = async () => {
    try {
      setLoading(true);
      const [firstPlaylist, secondPlaylist] = selectedRows;
      const startTime = Date.now();
      const intersectionData = await API.Spotify.GetUnion(
        firstPlaylist,
        secondPlaylist
      );
      const endTime = Date.now();
      const time = endTime - startTime;
      setResponseTime(time);
      if (intersectionData) {
        setSuccess(intersectionData);
      } else {
        setFailure(true);
      }
    } catch (error) {
      Notify.error('An error occured while operating with the playlists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      getData();
    },
    [queryParams]
  );

  if (Object.entries(success).length > 0) {
    return (
      <Success
        message={`Your new playlist ${success.name} is ready!`}
        description={`${success.name} contains a total of ${
          success.tracks
        } tracks. You can check your playlist on Spotify right now or continue in Settify. It took me around ${responseTime} ms to process this request.`}
        action={
          <Box gap="space-400">
            <Box direction="row" gap="space-200" justify="center">
              <a
                href={`https://open.spotify.com/playlist/${success.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Take me there!</Button>
              </a>
              <Button kind="secondary" onClick={() => window.location.reload()}>
                Continue
              </Button>
            </Box>
          </Box>
        }
      />
    );
  }

  if (failure) {
    return (
      <Success
        message="Your playlist could not be created :("
        description={`There are no tracks matching between the playlists. It took me around ${responseTime} ms to process this request.`}
        fail
        action={
          <Box gap="space-400">
            <Box direction="row" gap="space-200" justify="center">
              <Button kind="secondary" onClick={() => window.location.reload()}>
                Continue
              </Button>
            </Box>
          </Box>
        }
      />
    );
  }

  return (
    <>
      <AppTitle title="My Playlists" />
      <Card>
        {/* Actions */}
        <Box gap="space-200">
          <Box direction="row" gap="space-200" justify="center">
            <Button
              disabled={selectedRows.length !== 2}
              onClick={() => getIntersection()}
              loading={loading && selectedRows.length === 2}
            >
              Intersect
            </Button>
            <Button
              kind="secondary"
              disabled={selectedRows.length !== 2}
              onClick={() => getUnion()}
              loading={loading && selectedRows.length === 2}
            >
              Unify
            </Button>
            <Button
              kind="secondary"
              disabled={selectedRows.length !== 2}
              onClick={() => getIntersectionJS()}
              loading={loading && selectedRows.length === 2}
            >
              IntersectJS
            </Button>
          </Box>
          <ViewLoader loading={loading}>
            <Table
              key={selectedRows}
              columns={columns}
              emptiness="No data to show"
              rowUniqueIdentifier="id"
              data={data}
            />
          </ViewLoader>

          <Pagination
            currentPage={queryParams.page}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            disabled={loading}
          />
        </Box>
      </Card>
    </>
  );
};

Playlists.propTypes = {
  queryParams: PropTypes.shape({
    page: PropTypes.string,
  }).isRequired,
};

export default withRouter(Playlists);
