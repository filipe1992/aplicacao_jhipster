import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './carro.reducer';
import { ICarro } from 'app/shared/model/carro.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarroProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Carro = (props: ICarroProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { carroList, match, loading } = props;
  return (
    <div>
      <h2 id="carro-heading">
        <Translate contentKey="aplicacaojhipsterApp.carro.home.title">Carros</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="aplicacaojhipsterApp.carro.home.createLabel">Create new Carro</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {carroList && carroList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.carro.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.carro.placa">Placa</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.carro.endereco">Endereco</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.carro.pessoa">Pessoa</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carroList.map((carro, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${carro.id}`} color="link" size="sm">
                      {carro.id}
                    </Button>
                  </td>
                  <td>{carro.nome}</td>
                  <td>{carro.placa}</td>
                  <td>
                    {carro.enderecos
                      ? carro.enderecos.map((val, j) => (
                          <span key={j}>
                            <Link to={`endereco/${val.id}`}>{val.id}</Link>
                            {j === carro.enderecos.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{carro.pessoa ? <Link to={`pessoa/${carro.pessoa.id}`}>{carro.pessoa.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${carro.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carro.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carro.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="aplicacaojhipsterApp.carro.home.notFound">No Carros found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ carro }: IRootState) => ({
  carroList: carro.entities,
  loading: carro.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Carro);
