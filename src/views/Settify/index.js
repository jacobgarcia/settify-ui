import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import { AppWrapper } from '@credijusto/ui-components';

import Container from 'components/Container';
import Test from 'components/Test';
import AppFooter from 'components/AppFooter';

const Settify = () => {
  return (
    <AppWrapper hasNavbar>
      <Container>
        <Switch>
          <Route exact path={['/']} component={Test} />
        </Switch>
      </Container>
      <AppFooter />
    </AppWrapper>
  );
};

export default Settify;
