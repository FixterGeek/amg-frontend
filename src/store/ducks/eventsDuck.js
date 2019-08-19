import { getEvents } from '../../services/eventsServices';
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
import { stat } from 'fs';

let baseURL = "https://amg-api.herokuapp.com/"

const eventState = {
  array: [],
  events: [],
  fetching: false,
  status: "idle" // idle || success || error || fetching
};


// Constants
const POPULATE_EVENTS = 'POPULATE_EVENTS';
const POPULATE_EVENTS_SUCCESS = 'POPULATE_EVENTS_SUCCESS';
const POPULATE_EVENTS_ERROR = 'POPULATE_EVENTS_ERROR';

const GET_ADMIN_EVENTS = 'GET_ADMIN_EVENTS';
const GET_ADMIN_EVENTS_SUCCESS = 'GET_ADMIN_EVENTS_SUCCESS';
const GET_ADMIN_EVENTS_ERROR = 'GET_ADMIN_EVENTS_ERROR';






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

function reducer(state = eventState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default reducer;
