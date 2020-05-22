import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pessoa.reducer';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPessoaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PessoaUpdate = (props: IPessoaUpdateProps) => {
  const [enderecoId, setEnderecoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pessoaEntity, enderecos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pessoa');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEnderecos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pessoaEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="aplicacaojhipsterApp.pessoa.home.createOrEditLabel">
            <Translate contentKey="aplicacaojhipsterApp.pessoa.home.createOrEditLabel">Create or edit a Pessoa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pessoaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pessoa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pessoa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="pessoa-nome">
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.nome">Nome</Translate>
                </Label>
                <AvField id="pessoa-nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="cpfLabel" for="pessoa-cpf">
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.cpf">Cpf</Translate>
                </Label>
                <AvField id="pessoa-cpf" type="text" name="cpf" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="pessoa-email">
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.email">Email</Translate>
                </Label>
                <AvField id="pessoa-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneLabel" for="pessoa-telefone">
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.telefone">Telefone</Translate>
                </Label>
                <AvField id="pessoa-telefone" type="text" name="telefone" />
              </AvGroup>
              <AvGroup>
                <Label for="pessoa-endereco">
                  <Translate contentKey="aplicacaojhipsterApp.pessoa.endereco">Endereco</Translate>
                </Label>
                <AvInput id="pessoa-endereco" type="select" className="form-control" name="endereco.id">
                  <option value="" key="0" />
                  {enderecos
                    ? enderecos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pessoa" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  enderecos: storeState.endereco.entities,
  pessoaEntity: storeState.pessoa.entity,
  loading: storeState.pessoa.loading,
  updating: storeState.pessoa.updating,
  updateSuccess: storeState.pessoa.updateSuccess,
});

const mapDispatchToProps = {
  getEnderecos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PessoaUpdate);
