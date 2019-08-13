import { usersService } from "../../services/users";
import {
  switchMap, map, debounceTime, filter, catchError,
  withLatestFrom,
  pluck,
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { concat, of } from 'rxjs'
import { ofType } from 'redux-observable';

const APIURL = process.env.REACT_APP_BASE_API_URL;
const authToken = localStorage.getItem('authToken');


//actionTypes
export const ADD_USER_SUCCESS = 'amg-frontend/users/ADD_SUCCESS';
export const UPDATE_USER_SUCCESS = 'amg-frontend/users/UPDATE_SUCCESS';
export const DELETE_USER_SUCCESS = 'amg-frontend/users/DELETE_SUCCESS';
export const GET_USERS_SUCCESS = 'amg-frontend/users/GET_SUCCESS';
export const GET_USERS = 'amg-frontend/users/GET';
export const GET_USERS_ERROR = 'amg-frontend/users/GET_USERS_ERROR';


//initialState

const initialState = {
  array: [],
  fetching: false,
  error: '',
  status: 'idle', // success || error || fetching
}

//reducer


function reducer(state = initialState, action) {
  switch (action.type) {
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

export const getUsers = (query) => {
  return {
    type: GET_USERS,
    payload: query
  }
}

// thunks

export const getAllUsers = (query) => (dispatch, getState) => {
  return usersService.getAllUsers(query)
    .then(response => dispatch(getAllUsersSuccess(response)))
    .catch(error => error)
}

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
            console.log("ero", err)
            return of(getAllUsersError(err))
          })
        )
      )
    })
  )

}

export default reducer