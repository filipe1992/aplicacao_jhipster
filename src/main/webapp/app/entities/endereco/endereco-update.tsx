import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPessoa } from 'app/shared/model/pessoa.model';
import { getEntities as getPessoas } from 'app/entities/pessoa/pessoa.reducer';
import { ICarro } from 'app/shared/model/carro.model';
import { getEntities as getCarros } from 'app/entities/carro/carro.reducer';
import { getEntity, updateEntity, createEntity, reset } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnderecoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnderecoUpdate = (props: IEnderecoUpdateProps) => {
  const [pessoaId, setPessoaId] = useState('0');
  const [carroId, setCarroId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { enderecoEntity, pessoas, carros, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/endereco');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPessoas();
    props.getCarros();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.estado = convertDateTimeToServer(values.estado);

    if (errors.length === 0) {
      const entity = {
        ...enderecoEntity,
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
          <h2 id="aplicacaojhipsterApp.endereco.home.createOrEditLabel">
            <Translate contentKey="aplicacaojhipsterApp.endereco.home.createOrEditLabel">Create or edit a Endereco</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : enderecoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="endereco-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="endereco-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="paisLabel" for="endereco-pais">
                  <Translate contentKey="aplicacaojhipsterApp.endereco.pais">Pais</Translate>
                </Label>
                <AvField id="endereco-pais" type="text" name="pais" />
              </AvGroup>
              <AvGroup>
                <Label id="estadoLabel" for="endereco-estado">
                  <Translate contentKey="aplicacaojhipsterApp.endereco.estado">Estado</Translate>
                </Label>
                <AvInput
                  id="endereco-estado"
                  type="datetime-local"
                  className="form-control"
                  name="estado"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.enderecoEntity.estado)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="bairroLabel" for="endereco-bairro">
                  <Translate contentKey="aplicacaojhipsterApp.endereco.bairro">Bairro</Translate>
                </Label>
                <AvField id="endereco-bairro" type="string" className="form-control" name="bairro" />
              </AvGroup>
              <AvGroup>
                <Label id="ruaLabel" for="endereco-rua">
                  <Translate contentKey="aplicacaojhipsterApp.endereco.rua">Rua</Translate>
                </Label>
                <AvField id="endereco-rua" type="string" className="form-control" name="rua" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/endereco" replace color="info">
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
  pessoas: storeState.pessoa.entities,
  carros: storeState.carro.entities,
  enderecoEntity: storeState.endereco.entity,
  loading: storeState.endereco.loading,
  updating: storeState.endereco.updating,
  updateSuccess: storeState.endereco.updateSuccess,
});

const mapDispatchToProps = {
  getPessoas,
  getCarros,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnderecoUpdate);
