import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Carro from './carro';
import CarroDetail from './carro-detail';
import CarroUpdate from './carro-update';
import CarroDeleteDialog from './carro-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CarroDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarroDetail} />
      <ErrorBoundaryRoute path={match.url} component={Carro} />
    </Switch>
  </>
);

export default Routes;
