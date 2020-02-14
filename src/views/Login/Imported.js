import importedComponent from 'react-imported-component';

export default importedComponent(
  () => import('./index' /* webpackChunkName: "login" */),
  {
    LoadingComponent: null,
    ErrorComponent: null,
  }
);
