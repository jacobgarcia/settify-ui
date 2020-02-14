import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import { AppWrapper, AppFooter } from '@credijusto/ui-components';

import Container from 'components/Container';

const Settify = () => {
  return (
    <AppWrapper hasNavbar>
      <Container>
        <Switch>
          <Route exact path={['/']} component={<></>} />
        </Switch>
      </Container>
      <AppFooter />
    </AppWrapper>
  );
};

export default Settify;
