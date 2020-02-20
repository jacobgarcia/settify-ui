import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppTitle,
  Card,
  ViewLoader,
  Notify,
  Pagination,
  withRouter,
} from '@credijusto/ui-components';

import Actions from 'components/Actions';
import Table from 'components/Table';
import API from 'api';

const columns = [
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

const ITEMS_PER_PAGE = 20;

const Playlists = ({ queryParams }) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedRows, setSelectedRows] = useState([]);
  const handleChange = (value, name) => {
    if (value) {
      setSelectedRows((state) => [...state, name]);
    }
    if (!value) {
      setSelectedRows((state) => state.filter((e) => e !== name));
    }
  };

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

  useEffect(
    () => {
      getData();
    },
    [queryParams]
  );
  return (
    <>
      <AppTitle title="My Playlists" />
      <Card>
        <ViewLoader>
          <Table
            columns={columns}
            emptiness="No data to show"
            rowUniqueIdentifier="id"
            loading={loading}
            data={data}
            handleChange={handleChange}
          />
        </ViewLoader>

        <Pagination
          currentPage={1}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          disabled={loading}
        />
      </Card>
      <Actions selectedRows={selectedRows} />
    </>
  );
};

Playlists.propTypes = {
  queryParams: PropTypes.shape({
    page: PropTypes.string,
  }).isRequired,
};

export default withRouter(Playlists);
