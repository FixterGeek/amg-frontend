import { usersService } from "../../services/users";
import { updateNotSelfUser, deleteUser as dltUser } from '../../services/userServices';
import {
  switchMap, map, debounceTime, filter, catchError,
  withLatestFrom,
  pluck,
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { concat, of } from 'rxjs'
import { ofType } from 'redux-observable';
import useSweetAlert from "../../hooks/useSweetAlert";
import { successAction, errorAction } from './tools';

const APIURL = process.env.REACT_APP_BASE_API_URL;
const authToken = localStorage.getItem('authToken');


//actionTypes
export const ADD_USER_SUCCESS = 'amg-frontend/users/ADD_SUCCESS';
export const UPDATE_USER = 'amg-frontend/users/UPDATE';
export const UPDATE_USER_SUCCESS = 'amg-frontend/users/UPDATE_SUCCESS';
export const UPDATE_USER_ERROR = 'amg-frontend/users/UPDATE_ERROR';
export const DELETE_USER = 'amg-frontend/users/DELETE_USER';
export const DELETE_USER_SUCCESS = 'amg-frontend/users/DELETE_SUCCESS';
export const DELETE_USER_ERROR = 'amg-frontend/users/DELETE_USER';
export const GET_USERS_SUCCESS = 'amg-frontend/users/GET_SUCCESS';
export const GET_USERS = 'amg-frontend/users/GET';
export const GET_USERS_ERROR = 'amg-frontend/users/GET_USERS_ERROR';
export const WRITE_WORKING_ON = 'WRITE_USER_DETAIL_WORKING_ON';
export const SET_WORKING_ON = 'SET_USER_DETAIL_WORKING_ON';
const RESET_USER_STATUS = 'amg-frontend/users/RESET_USER_STATUS'

//initialState

const initialState = {
  array: [],
  workingOn: {},
  fetching: false,
  error: '',
  status: 'idle', // success || error || fetching
}

//reducer


function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_USER_STATUS:
      return { ...state, fetching: false, status: null };
    case GET_USERS_ERROR:
      return {
        ...state,
        fetching: false,
        status: "error"
      }
    case GET_USERS:
      return {
        ...state,
        fetching: true,
        status: "fetching"
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        array: [...action.payload],
        fetching: false,
        status: "success"
      }
    case UPDATE_USER:
      return { ...state, fetching: true };
    case UPDATE_USER_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: state.array.map(u => u._id === action.payload._id ? action.payload : u),
      };
    case UPDATE_USER_ERROR:
      return { ...state, fetching: false, status: 'error', error: action.payload };
    case SET_WORKING_ON:
      return { ...state, workingOn: {...action.payload} };
    case WRITE_WORKING_ON:
      return {
        ...state,
        workingOn: {
          ...state.workingOn,
          [action.payload.name]: action.payload.value,
        }
      };
    /* Delete user */
    case DELETE_USER:
      return { ...state, fetching: true };
    case DELETE_USER_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: state.array.filter(u => u._id !== action.payload._id),
      }
    case DELETE_USER_ERROR:
      return {
        ...state, fetching: false, status: 'error',
      };
    default:
      return state;
  }
}

//actions
export const getAllUsersError = (err) => {
  return {
    type: GET_USERS_ERROR,
    payload: err
  }
}

export const getAllUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users
  }
}

export const getUsers = (query="") => {
  return {
    type: GET_USERS,
    payload: query
  }
}

export function updateUserSucces(userData) {
  return { type: UPDATE_USER_SUCCESS, payload: userData };
}

export function updateUserError(error) {
  return { type: UPDATE_USER_ERROR, payload: error };
}

// delete
export function deleteUser() {
  return { type: DELETE_USER };
}

export function deleteUserSuccess(deletedUser) {
  return { type: DELETE_USER_SUCCESS, payload: deletedUser };
}

export function deleteUserError(error) {
  return { type: DELETE_USER_ERROR, payload: error };
}

export function writeWorkingOn(name, value) {
  return { type: WRITE_WORKING_ON, payload: { name, value }};
}

export function setWorkingOn(userData) {
  return { type: SET_WORKING_ON, payload: userData };
}

// 

// thunks

export const getAllUsers = (query) => (dispatch, getState) => {
  const { user } = getState();
  dispatch(getUsers());
  return usersService.getAllUsers(query)
    .then(response => {
      if (user.filialAsAdmin) {
        const d = response.filter(u => 
          u.filialAsUser === user.filialAsAdmin ||
          u.basicData.address.state === user.basicData.address.state
        )
        dispatch(updateUserSucces(d))
        return d;
      }
      dispatch(getAllUsersSuccess(response))
    })
    .catch(error => error)
}

export const updateUser = (userData) => (dispatch) => {
  dispatch({ type: UPDATE_USER })
  return updateNotSelfUser(userData._id, userData)
    .then((data) => {
      useSweetAlert().successAlert({ text: 'Usuario actualizado' });
      dispatch(updateUserSucces(data))
      return data;
    })
    .catch((error) => {
      useSweetAlert().errorAlert({ text: 'Error al actualizar usuario' });
      dispatch(updateUserError(error));
      return error;
    });
};

export const deleteUserAction = (userId) => (dispatch) => {
  dispatch(deleteUser());
  return dltUser(userId)
    .then((deletedUser) => {
      return successAction(
        dispatch, deleteUserSuccess, deletedUser, RESET_USER_STATUS, 'Usuario eliminado',
      );
    })
    .catch((error) => {
      return errorAction(
        dispatch, deleteUserError, error, RESET_USER_STATUS, 'No fue posible eliminar el usuario',
      );
    });
};

//or 

//epics

export function getUsersEpic(action$, state$) {
  return action$.pipe(
    ofType(GET_USERS),
    withLatestFrom(state$.pipe(pluck('user'))),
    switchMap(([action, { token }]) => {
      let query = ''
      if (action.payload) query = action.payload
      return concat(
        ajax.get(`${APIURL}/users${query}`, {
          'Content-Type': 'application/json',
          'Authorization': token
        }).pipe(
          map(resp => getAllUsersSuccess(resp.response)),
          catchError(err => {
            return of(getAllUsersError(err))
          })
        )
      )
    })
  )

}

export default reducer