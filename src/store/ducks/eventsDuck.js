import { getEvents, getEventsForUser } from '../../services/eventsServices';
import {
  switchMap,
  map,
  debounceTime,
  filter,
  catchError,
  delay,
  takeUntil,
  withLatestFrom,
  pluck,
  tap,
  ignoreElements
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { concat, of, EMPTY } from 'rxjs'
import { ofType } from 'redux-observable';

import { errorAction, successAction } from './tools';

let baseURL = "https://amg-api.herokuapp.com/"

const eventState = {
  array: [],
  userEvents: [],
  events: [],
  fetching: false,
  status: "idle" // idle || success || error || fetching
};


// Constants
const RESET_EVENTS_STATUS = 'PUBLIC/RESET_EVENTS_STATUS';

const POPULATE_EVENTS = 'POPULATE_EVENTS';
const POPULATE_EVENTS_SUCCESS = 'POPULATE_EVENTS_SUCCESS';
const POPULATE_EVENTS_ERROR = 'POPULATE_EVENTS_ERROR';

const GET_ADMIN_EVENTS = 'GET_ADMIN_EVENTS';
const GET_ADMIN_EVENTS_SUCCESS = 'GET_ADMIN_EVENTS_SUCCESS';
const GET_ADMIN_EVENTS_ERROR = 'GET_ADMIN_EVENTS_ERROR';

const POPULATE_USER_EVENTS = 'POPULATE_USER_EVENTS';
const POPULATE_USER_EVENTS_SUCCESS = 'POPULATE_USER_EVENTS_SUCCESS';
const POPULATE_USER_EVENTS_ERROR = 'POPULATE_USER_EVENTS_ERROR';


// actionCreators

export function getAdminEvents() {  
  return { type: GET_ADMIN_EVENTS };
}
export function getAdminEventsError(err) {
  return { type: GET_ADMIN_EVENTS_ERROR, payload: err };
}
export function getAdminEventsSuccess(events) {
  return { type: GET_ADMIN_EVENTS_SUCCESS, payload: events };
}
////////////////////////////////////////

export function populateEvents() {
  return { type: POPULATE_EVENTS }
}

export function populateEventsSuccess(payload) {
  return {
    type: POPULATE_EVENTS_SUCCESS,
    payload,
  };
}

export function populateEventsError(payload) {
  return {
    type: POPULATE_EVENTS_ERROR,
    payload,
  };
}

// populate user events
export function populateUserEvents() {
  return { type: POPULATE_USER_EVENTS };
}

export function populateUserEventsSuccess(eventsArray) {
  return { type: POPULATE_USER_EVENTS_SUCCESS, payload: eventsArray };
}

export function populateUserEventsError(error) {
  return { type: POPULATE_USER_EVENTS_ERROR, payload: error };
}

// observable
export function getAdminEventsEpic(action$, state$) {  
  return action$.pipe(
    ofType(GET_ADMIN_EVENTS),
    //debounceTime(500),
    //filter(({ payload }) => typeof payload === "object" && payload.password !== "" && payload.email !== ""),
    withLatestFrom(state$.pipe(pluck('user'))),
    switchMap(([action, { token }]) => {
      return concat(
        //of(setFetchingUser()),
        ajax.get(`${baseURL}events/`, { "Authorization": token }).pipe(
          map(resp => {            
            return getAdminEventsSuccess([...resp.response])
          }),
          //delay(5000),
          //takeUntil(action$.pipe(ofType("CANCEL"))),
          catchError(err => {
            console.log("ero", err)
            return of(getAdminEventsError(err))
          })
        )
      )
    })
  )

}

// Thunks


// Populate events
export const populateEventsAction = () => (dispatch) => {
  dispatch(populateEvents());
  return getEvents()
    .then((data) => {
      dispatch(populateEventsSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(populateEventsError(error));
      return error;
    });
};

// populate users events
export const populateUserEventsAction = (userId) => (dispatch) => {
  dispatch(populateUserEvents());
  return getEventsForUser(userId)
    .then((data) => {
      return successAction(
        dispatch, populateUserEventsSuccess, data, RESET_EVENTS_STATUS, false
      );
    })
    .catch((error) => {
      console.log(error);
      return errorAction(
        dispatch, populateUserEventsError, error, RESET_EVENTS_STATUS, 'Tue eventos no estan disponibles'
      );
    })
};

function reducer(state = eventState, action) {
  switch (action.type) {
    /* RESET STATUS */
    case RESET_EVENTS_STATUS:
      return { ...state, status: null, fetching: false };
    case GET_ADMIN_EVENTS:
      return { ...state, status: "fetching", fetching: true }
    case GET_ADMIN_EVENTS_SUCCESS:
      return { array: [...action.payload], status: "success", fetching: false }
    case GET_ADMIN_EVENTS_ERROR:
      return { ...state, status: "error", fetching: false, error: action.payload }
    case POPULATE_EVENTS_SUCCESS:
      return { ...state, events: [...action.payload], fetching: false };
    case POPULATE_EVENTS_ERROR:
      return { ...state, fetching: false, error: true };
    case POPULATE_EVENTS:
      return { ...state, fetching: true };
    /* POPULATE EVENTS FOR USER */
    case POPULATE_USER_EVENTS:
      return { ...state, fetching: true };
    case POPULATE_USER_EVENTS_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        userEvents: action.payload || ['noData'],
      };
    case POPULATE_USER_EVENTS_ERROR:
      return { ...state, fetching: false, status: 'error', error: action.payload };
    default:
      return state;
  }
}

export default reducer;
