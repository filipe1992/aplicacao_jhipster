import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPessoa, defaultValue } from 'app/shared/model/pessoa.model';

export const ACTION_TYPES = {
  FETCH_PESSOA_LIST: 'pessoa/FETCH_PESSOA_LIST',
  FETCH_PESSOA: 'pessoa/FETCH_PESSOA',
  CREATE_PESSOA: 'pessoa/CREATE_PESSOA',
  UPDATE_PESSOA: 'pessoa/UPDATE_PESSOA',
  DELETE_PESSOA: 'pessoa/DELETE_PESSOA',
  RESET: 'pessoa/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPessoa>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PessoaState = Readonly<typeof initialState>;

// Reducer

export default (state: PessoaState = initialState, action): PessoaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PESSOA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PESSOA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PESSOA):
    case REQUEST(ACTION_TYPES.UPDATE_PESSOA):
    case REQUEST(ACTION_TYPES.DELETE_PESSOA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PESSOA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PESSOA):
    case FAILURE(ACTION_TYPES.CREATE_PESSOA):
    case FAILURE(ACTION_TYPES.UPDATE_PESSOA):
    case FAILURE(ACTION_TYPES.DELETE_PESSOA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PESSOA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PESSOA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PESSOA):
    case SUCCESS(ACTION_TYPES.UPDATE_PESSOA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PESSOA):
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

const apiUrl = 'api/pessoas';

// Actions

export const getEntities: ICrudGetAllAction<IPessoa> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PESSOA_LIST,
  payload: axios.get<IPessoa>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPessoa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PESSOA,
    payload: axios.get<IPessoa>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPessoa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PESSOA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPessoa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PESSOA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPessoa> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PESSOA,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
