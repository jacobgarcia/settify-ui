import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Title, Notify } from '@credijusto/ui-components';

import API from 'api';

const Actions = ({ selectedRows }) => {
  const [loading, setLoading] = useState(false);

  const getIntersection = async () => {
    try {
      setLoading(true);
      const [firstPlaylist, secondPlaylist] = selectedRows;
      const { items } = await API.Spotify.GetIntersection(
        firstPlaylist,
        secondPlaylist
      );
      console.log(items);
    } catch (error) {
      Notify.error('An error occured while intersecting the playlists');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title level={1}>Actions</Title>
      <Card>
        <Button
          disabled={selectedRows.length !== 2}
          onClick={() => getIntersection()}
          loading={loading}
        >
          Intersect
        </Button>
      </Card>
    </>
  );
};

Actions.propTypes = {
  selectedRows: PropTypes.arrayOf({}),
};

Actions.defaultProps = {
  selectedRows: [],
};

export default Actions;
