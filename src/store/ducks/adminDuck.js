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

let baseURL = "https://amg-api.herokuapp.com/"

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
let GET_SINGLE_EVENT = "GET_SINGLE_EVENT"
let GET_SINGLE_EVENT_SUCCESS = "GET_SINGLE_EVENT_SUCCESS"
let GET_SINGLE_EVENT_ERROR = "GET_SINGLE_EVENT_ERROR"
let UPDATE_WORKING_ON = "UPDATE_WORKING_ON"

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

export function getSingleEvent(id) {
    return {
        type: GET_SINGLE_EVENT,
        payload: id
    }
}

export function getSingleEventSuccess(event) {
    return {
        type: GET_SINGLE_EVENT_SUCCESS,
        payload: event
    }
}
export function getSingleEventError(event) {
    return {
        type: GET_SINGLE_EVENT_ERROR,
        payload: event
    }
}

export function updateWorkingOn(event) {
    return {
        type: UPDATE_WORKING_ON,
        payload: event
    }
}

//epics
export function getSingleEventEpic(action$, state$) {
    return action$.pipe(
        ofType(GET_SINGLE_EVENT),
        //debounceTime(500),
        //filter(({ payload }) => typeof payload === "object" && payload.password !== "" && payload.email !== ""),
        withLatestFrom(state$.pipe(pluck('user'))),
        switchMap(([action, { token }]) => {
            console.log(action.payload)
            return concat(
                //of(setFetchingUser()),
                ajax.get(`${baseURL}events/${action.payload}/`, { "Authorization": token }).pipe(
                    map(resp => {
                        console.log(resp)
                        //localStorage.authToken = resp.response.token
                        return getSingleEventSuccess({ ...resp.response })
                    }),
                    //delay(5000),
                    //takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {
                        console.log("ero", err)
                        return of(getSingleEventError(err))
                    })
                )
            )
        })
    )

}

export function saveDraftEventEpic(action$, state$) {
    return action$.pipe(
        ofType(SAVE_DRAFT_EVENT),
        //debounceTime(500),
        //filter(({ payload }) => typeof payload === "object" && payload.password !== "" && payload.email !== ""),
        withLatestFrom(state$.pipe(pluck('user'))),
        switchMap(([action, { token }]) => {
            if (action.payload.id) {
                return concat(
                    //of(setFetchingUser()),
                    ajax.patch(baseURL + "events/" + action.payload.id, action.payload.body, { "Authorization": token }).pipe(
                        map(resp => {
                            console.log(resp)
                            //localStorage.authToken = resp.response.token
                            return saveDraftEventSuccess({ ...resp.response })
                        }),
                        //delay(5000),
                        //takeUntil(action$.pipe(ofType("CANCEL"))),
                        catchError(err => {
                            console.log("ero", err)
                            return of(saveDraftEventError(err))
                        })
                    )
                )
            }
            return concat(
                //of(setFetchingUser()),
                ajax.post(baseURL + "events", action.payload, { "Authorization": token }).pipe(
                    map(resp => {
                        console.log(resp)
                        //localStorage.authToken = resp.response.token
                        return saveDraftEventSuccess({ ...resp.response })
                    }),
                    //delay(5000),
                    //takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {
                        console.log("ero", err)
                        return of(saveDraftEventError(err))
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
    state = {
        mainImages: null,
        permisos: null,
        speakers: [],
        // modules: ["ids de los modulos"],
        location: {
            addressName: "",
            street: "",
            outdoorNumber: "",
            interiorNumber: "",
            colony: "",
            zipCode: "",
            city: "",
            state: null,
            coordinates: []
        },
        title: 'titulo',
        startDate: null,
        startTime: '',
        endDate: '',
        description: [],
        mainImagesURLS: ["https://miro.medium.com/fit/c/256/256/0*jp3IFb08Sy3_k3N_."],
        permisosURLS: [],
        status: "draft",
        fetching: false

    }, // {}
    action
) {
    switch (action.type) {
        case UPDATE_WORKING_ON:
            return { ...state, ...action.payload, fetching: false }
        case SAVE_DRAFT_EVENT_SUCCESS:
            return { ...action.payload, fetching: false }
        case GET_SINGLE_EVENT_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_SINGLE_EVENT_SUCCESS:
            return { ...state, ...action.payload, fetching: false }
        case GET_SINGLE_EVENT:
            return { ...state, fetching: true }
        case SAVE_DRAFT_EVENT:
            return { ...state, ...action.payload, fetching: true }
        default:
            return state
    }
}

export default combineReducers({ draftEvents, workingOn })
