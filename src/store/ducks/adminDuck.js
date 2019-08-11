//imports
import { combineReducers } from 'redux'
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

let baseURL = "https://amg-api.herokuapp.com"

//initial
let initialState = {
    draftEvents: {
        status: "idle" // idle || error || fetching || success
    }
}

// constants
let SAVE_DRAFT_EVENT = "SAVE_DRAFT_EVENT"
let SAVE_DRAFT_EVENT_SUCCESS = "SAVE_DRAFT_EVENT_SUCCESS"
let SAVE_DRAFT_EVENT_ERROR = "SAVE_DRAFT_EVENT_ERROR"

//action creators
export function saveDraftEvent(event) {
    return {
        type: SAVE_DRAFT_EVENT,
        payload: event
    }
}
export function saveDraftEventSuccess(event) {
    return {
        type: SAVE_DRAFT_EVENT_SUCCESS,
        payload: event
    }
}
export function saveDraftEventError(err) {
    return {
        type: SAVE_DRAFT_EVENT_ERROR,
        payload: err
    }
}

//epics
export function saveDraftEventEpic(action$, state$) {
    return action$.pipe(
        ofType(SAVE_DRAFT_EVENT),
        //debounceTime(500),
        //filter(({ payload }) => typeof payload === "object" && payload.password !== "" && payload.email !== ""),
        withLatestFrom(state$.pipe(pluck('user'))),
        switchMap(([action, { token }]) => {
            return concat(
                //of(setFetchingUser()),
                ajax.post(baseURL + "/events", action.payload, { "Authorization": token }).pipe(
                    map(resp => {
                        console.log(resp)
                        //localStorage.authToken = resp.response.token
                        return saveDraftEventSuccess({ ...resp.response })
                    }),
                    //delay(5000),
                    //takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {
                        console.log("ero", err)
                        return of(saveDraftEventError(err.response.name))
                    })
                )
            )
        })
    )

}

//reducers
function draftEvents(
    state = initialState.draftEvents, // {}
    action
) {
    switch (action.type) {
        case SAVE_DRAFT_EVENT_SUCCESS:
            return { ...action.payload, status: "success" }
        case SAVE_DRAFT_EVENT_ERROR:
            return { ...state, error: action.payload }
        case SAVE_DRAFT_EVENT:
            return { ...state, status: "fetching" }
        default:
            return state
    }
}

function workingOn(
    state = {}, // {}
    action
) {
    switch (action.type) {
        case SAVE_DRAFT_EVENT:
            return { ...action.payload }
        default:
            return state
    }
}

export default combineReducers({ draftEvents, workingOn })
