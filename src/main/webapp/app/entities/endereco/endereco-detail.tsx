import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnderecoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnderecoDetail = (props: IEnderecoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { enderecoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="aplicacaojhipsterApp.endereco.detail.title">Endereco</Translate> [<b>{enderecoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="pais">
              <Translate contentKey="aplicacaojhipsterApp.endereco.pais">Pais</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.pais}</dd>
          <dt>
            <span id="estado">
              <Translate contentKey="aplicacaojhipsterApp.endereco.estado">Estado</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.estado ? <TextFormat value={enderecoEntity.estado} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="bairro">
              <Translate contentKey="aplicacaojhipsterApp.endereco.bairro">Bairro</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.bairro}</dd>
          <dt>
            <span id="rua">
              <Translate contentKey="aplicacaojhipsterApp.endereco.rua">Rua</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.rua}</dd>
        </dl>
        <Button tag={Link} to="/endereco" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/endereco/${enderecoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ endereco }: IRootState) => ({
  enderecoEntity: endereco.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnderecoDetail);
