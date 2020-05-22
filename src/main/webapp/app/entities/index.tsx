import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pessoa from './pessoa';
import Carro from './carro';
import Endereco from './endereco';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}pessoa`} component={Pessoa} />
      <ErrorBoundaryRoute path={`${match.url}carro`} component={Carro} />
      <ErrorBoundaryRoute path={`${match.url}endereco`} component={Endereco} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
