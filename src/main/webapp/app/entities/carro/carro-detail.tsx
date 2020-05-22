import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './carro.reducer';
import { ICarro } from 'app/shared/model/carro.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarroDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarroDetail = (props: ICarroDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { carroEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="aplicacaojhipsterApp.carro.detail.title">Carro</Translate> [<b>{carroEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nome">
              <Translate contentKey="aplicacaojhipsterApp.carro.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{carroEntity.nome}</dd>
          <dt>
            <span id="placa">
              <Translate contentKey="aplicacaojhipsterApp.carro.placa">Placa</Translate>
            </span>
          </dt>
          <dd>{carroEntity.placa}</dd>
          <dt>
            <Translate contentKey="aplicacaojhipsterApp.carro.endereco">Endereco</Translate>
          </dt>
          <dd>
            {carroEntity.enderecos
              ? carroEntity.enderecos.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {carroEntity.enderecos && i === carroEntity.enderecos.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="aplicacaojhipsterApp.carro.pessoa">Pessoa</Translate>
          </dt>
          <dd>{carroEntity.pessoa ? carroEntity.pessoa.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/carro" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carro/${carroEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ carro }: IRootState) => ({
  carroEntity: carro.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarroDetail);
