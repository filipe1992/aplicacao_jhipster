import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICarro, defaultValue } from 'app/shared/model/carro.model';

export const ACTION_TYPES = {
  FETCH_CARRO_LIST: 'carro/FETCH_CARRO_LIST',
  FETCH_CARRO: 'carro/FETCH_CARRO',
  CREATE_CARRO: 'carro/CREATE_CARRO',
  UPDATE_CARRO: 'carro/UPDATE_CARRO',
  DELETE_CARRO: 'carro/DELETE_CARRO',
  RESET: 'carro/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICarro>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CarroState = Readonly<typeof initialState>;

// Reducer

export default (state: CarroState = initialState, action): CarroState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARRO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CARRO):
    case REQUEST(ACTION_TYPES.UPDATE_CARRO):
    case REQUEST(ACTION_TYPES.DELETE_CARRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CARRO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARRO):
    case FAILURE(ACTION_TYPES.CREATE_CARRO):
    case FAILURE(ACTION_TYPES.UPDATE_CARRO):
    case FAILURE(ACTION_TYPES.DELETE_CARRO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARRO):
    case SUCCESS(ACTION_TYPES.UPDATE_CARRO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARRO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/carros';

// Actions

export const getEntities: ICrudGetAllAction<ICarro> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CARRO_LIST,
  payload: axios.get<ICarro>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICarro> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARRO,
    payload: axios.get<ICarro>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICarro> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARRO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICarro> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARRO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICarro> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARRO,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
