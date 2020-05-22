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
import { IPessoa } from 'app/shared/model/pessoa.model';
import { getEntities as getPessoas } from 'app/entities/pessoa/pessoa.reducer';
import { getEntity, updateEntity, createEntity, reset } from './carro.reducer';
import { ICarro } from 'app/shared/model/carro.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarroUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarroUpdate = (props: ICarroUpdateProps) => {
  const [idsendereco, setIdsendereco] = useState([]);
  const [pessoaId, setPessoaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { carroEntity, enderecos, pessoas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/carro');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEnderecos();
    props.getPessoas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...carroEntity,
        ...values,
        enderecos: mapIdList(values.enderecos),
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
          <h2 id="aplicacaojhipsterApp.carro.home.createOrEditLabel">
            <Translate contentKey="aplicacaojhipsterApp.carro.home.createOrEditLabel">Create or edit a Carro</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : carroEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="carro-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="carro-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="carro-nome">
                  <Translate contentKey="aplicacaojhipsterApp.carro.nome">Nome</Translate>
                </Label>
                <AvField id="carro-nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="placaLabel" for="carro-placa">
                  <Translate contentKey="aplicacaojhipsterApp.carro.placa">Placa</Translate>
                </Label>
                <AvField id="carro-placa" type="text" name="placa" />
              </AvGroup>
              <AvGroup>
                <Label for="carro-endereco">
                  <Translate contentKey="aplicacaojhipsterApp.carro.endereco">Endereco</Translate>
                </Label>
                <AvInput
                  id="carro-endereco"
                  type="select"
                  multiple
                  className="form-control"
                  name="enderecos"
                  value={carroEntity.enderecos && carroEntity.enderecos.map(e => e.id)}
                >
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
              <AvGroup>
                <Label for="carro-pessoa">
                  <Translate contentKey="aplicacaojhipsterApp.carro.pessoa">Pessoa</Translate>
                </Label>
                <AvInput id="carro-pessoa" type="select" className="form-control" name="pessoa.id">
                  <option value="" key="0" />
                  {pessoas
                    ? pessoas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/carro" replace color="info">
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
  pessoas: storeState.pessoa.entities,
  carroEntity: storeState.carro.entity,
  loading: storeState.carro.loading,
  updating: storeState.carro.updating,
  updateSuccess: storeState.carro.updateSuccess,
});

const mapDispatchToProps = {
  getEnderecos,
  getPessoas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarroUpdate);
