import importedComponent from 'react-imported-component';

export default importedComponent(
  () => import('./index' /* webpackChunkName: "settify" */),
  {
    LoadingComponent: null,
    ErrorComponent: null,
  }
);
