import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEndereco, defaultValue } from 'app/shared/model/endereco.model';

export const ACTION_TYPES = {
  FETCH_ENDERECO_LIST: 'endereco/FETCH_ENDERECO_LIST',
  FETCH_ENDERECO: 'endereco/FETCH_ENDERECO',
  CREATE_ENDERECO: 'endereco/CREATE_ENDERECO',
  UPDATE_ENDERECO: 'endereco/UPDATE_ENDERECO',
  DELETE_ENDERECO: 'endereco/DELETE_ENDERECO',
  RESET: 'endereco/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEndereco>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EnderecoState = Readonly<typeof initialState>;

// Reducer

export default (state: EnderecoState = initialState, action): EnderecoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENDERECO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENDERECO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ENDERECO):
    case REQUEST(ACTION_TYPES.UPDATE_ENDERECO):
    case REQUEST(ACTION_TYPES.DELETE_ENDERECO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ENDERECO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENDERECO):
    case FAILURE(ACTION_TYPES.CREATE_ENDERECO):
    case FAILURE(ACTION_TYPES.UPDATE_ENDERECO):
    case FAILURE(ACTION_TYPES.DELETE_ENDERECO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENDERECO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENDERECO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENDERECO):
    case SUCCESS(ACTION_TYPES.UPDATE_ENDERECO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENDERECO):
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

const apiUrl = 'api/enderecos';

// Actions

export const getEntities: ICrudGetAllAction<IEndereco> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ENDERECO_LIST,
  payload: axios.get<IEndereco>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEndereco> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENDERECO,
    payload: axios.get<IEndereco>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEndereco> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENDERECO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEndereco> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENDERECO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEndereco> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENDERECO,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
