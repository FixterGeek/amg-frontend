import { usersService } from "../../services/users";
import { switchMap, map, debounceTime, filter, catchError } from 'rxjs/operators'
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

//initialState

const initialState = {
  data: [],
  fetching: false,
  error: ''
}

//reducer


function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        fetching: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        fetching: false
      }
    default:
      return state;
  }
}

//actions

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

export function getUsersEpic(action$) {
  return action$.pipe(
    ofType(GET_USERS),
    switchMap(action => {
      return concat(
        ajax.get(`${APIURL}/users${action.payload}`, {
          'Content-Type': 'application/json',
          'Authorization': authToken
        }).pipe(
          map(resp => getAllUsersSuccess(resp.response)),
          catchError(err => console.log(err))
        )
      )
    })
  )

}

export default reducer