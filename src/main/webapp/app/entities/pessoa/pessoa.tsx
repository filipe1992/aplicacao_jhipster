import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pessoa.reducer';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPessoaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Pessoa = (props: IPessoaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { pessoaList, match, loading } = props;
  return (
    <div>
      <h2 id="pessoa-heading">
        <Translate contentKey="aplicacaojhipsterApp.pessoa.home.title">Pessoas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="aplicacaojhipsterApp.pessoa.home.createLabel">Create new Pessoa</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {pessoaList && pessoaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.cpf">Cpf</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.telefone">Telefone</Translate>
                </th>
                <th>
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.endereco">Endereco</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pessoaList.map((pessoa, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pessoa.id}`} color="link" size="sm">
                      {pessoa.id}
                    </Button>
                  </td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.cpf}</td>
                  <td>{pessoa.email}</td>
                  <td>{pessoa.telefone}</td>
                  <td>{pessoa.endereco ? <Link to={`endereco/${pessoa.endereco.id}`}>{pessoa.endereco.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pessoa.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pessoa.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pessoa.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="aplicacaojhipsterApp.pessoa.home.notFound">No Pessoas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ pessoa }: IRootState) => ({
  pessoaList: pessoa.entities,
  loading: pessoa.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pessoa);
