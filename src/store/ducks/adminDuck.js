//imports
import { combineReducers } from 'redux'
import toastr from 'toastr'
import axios from 'axios'

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
import { allSettled } from 'q';
import {
    addSpeakerToEvent,
    patchEventActivity,
    patchEventModule,
} from '../../services/eventsServices';

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
const RESET_ADMIN = "RESET_ADMIN_VALUES";

const ADD_MODULE = "ADD_MODULE"
const ADD_MODULE_ERROR = "ADD_MODULE_ERROR"
const ADD_MODULE_SUCCESS = "ADD_MODULE_SUCCESS"
const REMOVE_MODULE = "REMOVE_MODULE"
const REMOVE_MODULE_ERROR = "REMOVE_MODULE_ERROR"
const REMOVE_MODULE_SUCCESS = "REMOVE_MODULE_SUCCESS"

const ADD_ACTIVITY = "ADD_ACTIVITY"
const ADD_ACTIVITY_ERROR = "ADD_ACTIVITY_ERROR"
const ADD_ACTIVITY_SUCCESS = "ADD_ACTIVITY_SUCCESS"
const REMOVE_ACTIVITY = "REMOVE_ACTIVITY"
const REMOVE_ACTIVITY_ERROR = "REMOVE_ACTIVITY_ERROR"
const REMOVE_ACTIVITY_SUCCESS = "REMOVE_ACTIVITY_SUCCESS"

const DELETE_EVENT = "DELETE_EVENT"
const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS"
const DELETE_EVENT_ERROR = "DELETE_EVENT_ERROR"

const ADD_SPEAKER = 'ADD_SPEAKER'
const ADD_SPEAKER_SUCCESS = 'ADD_SPEAKER_SUCCESS'
const ADD_SPEAKER_ERROR = 'ADD_SPEAKER_ERROR'

const UPDATE_EVENT_ACTIVITY = 'UPDATE_EVENT_ACTIVITY'
const UPDATE_EVENT_ACTIVITY_SUCCESS = 'UPDATE_EVENT_ACTIVITY_SUCCESS'
const UPDATE_EVENT_ACTIVITY_ERROR = 'UPDATE_EVENT_ACTIVITY_ERROR'

const UPDATE_EVENT_MODULE = 'UPDATE_EVENT_MODULE'
const UPDATE_EVENT_MODULE_SUCCESS = 'UPDATE_EVENT_MODULE_SUCCESS'
const UPDATE_EVENT_MODULE_ERROR = 'UPDATE_EVENT_MODULE_ERROR'

//action creators
// delete
function deleteEventSuccess() {
    return { type: DELETE_EVENT_SUCCESS }
}
function deleteEventError(error) {
    return { type: DELETE_EVENT_ERROR, payload: error }
}

//activities
function addActivity() {
    return { type: ADD_ACTIVITY }
}
function addActivitySuccess(payload) {
    return { payload, type: ADD_ACTIVITY_SUCCESS }
}
function addActivityError(payload) {
    return { payload, type: ADD_ACTIVITY_ERROR }
}
function removeActivity() {
    return { type: REMOVE_ACTIVITY }
}
function removeActivityError(payload) {
    return { payload, type: REMOVE_ACTIVITY_ERROR }
}
function removeActivitySuccess(payload) {
    return { payload, type: REMOVE_ACTIVITY_SUCCESS }
}
//mdules
function addModule() {
    return { type: ADD_MODULE }
}
function addModuleSuccess(payload) {
    return { payload, type: ADD_MODULE_SUCCESS }
}
function addModuleError(payload) {
    return { payload, type: ADD_MODULE_ERROR }
}
function removeModule() {
    return { type: REMOVE_MODULE }
}
function removeModuleError(payload) {
    return { payload, type: REMOVE_MODULE_ERROR }
}
function removeModuleSuccess(payload) {
    return { payload, type: REMOVE_MODULE_SUCCESS }
}


export function saveDraftEvent(event, history) {
    return {
        type: SAVE_DRAFT_EVENT,
        payload: event,
        history,
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

// Add speaker
export function  addSPeaker() {
    return { type: ADD_SPEAKER }
}

export function addSPeakerSuccess(speakerData) {
    return { type: ADD_SPEAKER_SUCCESS, payload: speakerData };
}

export function addSPeakerError(error) {
    return { type: ADD_SPEAKER_ERROR, payload: error };
}

// Update activity
export function updateEventActivity() {
    return { type: UPDATE_EVENT_ACTIVITY }
}

export function updateEventActivitySuccess(activityData) {
    return { type: UPDATE_EVENT_ACTIVITY_SUCCESS, payload: activityData }
}

export function updateEventActivityError(error) {
    return { type: UPDATE_EVENT_ACTIVITY_ERROR, payload: error }
}

// Update event module
export function updateEventModule() {
    return { type: UPDATE_EVENT_MODULE }
}

export function updateEventModuleSuccess(moduleData) {
    return { type: UPDATE_EVENT_MODULE_SUCCESS, payload: moduleData }
}

export function updateEventModuleError(error) {
    return { type: UPDATE_EVENT_MODULE_ERROR, payload: error }
}

//epics
export function getSingleEventEpic(action$, state$) {
    return action$.pipe(
        ofType(GET_SINGLE_EVENT),
        //debounceTime(500),
        //filter(({ payload }) => typeof payload === "object" && payload.password !== "" && payload.email !== ""),
        withLatestFrom(state$.pipe(pluck('user'))),
        switchMap(([action, { token }]) => {
            return concat(
                //of(setFetchingUser()),
                ajax.get(`${baseURL}events/${action.payload}/`, { "Authorization": token }).pipe(
                    map(resp => {
                        //localStorage.authToken = resp.response.token
                        return getSingleEventSuccess({ ...resp.response, s: 'success' })
                    }),
                    //delay(5000),
                    //takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {
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
                            //localStorage.authToken = resp.response.token
                            toastr.success("Evento Guardado")
                            return saveDraftEventSuccess({ ...resp.response })
                        }),
                        //delay(5000),
                        //takeUntil(action$.pipe(ofType("CANCEL"))),
                        catchError(err => {
                            return of(saveDraftEventError(err))
                        })
                    )
                )
            }

            return concat(
                //of(setFetchingUser()),
                ajax.post(baseURL + "events", action.payload.body, { "Authorization": token }).pipe(
                    map(resp => {
                        toastr.success("Nuevo Evento Guardado")
                        if (action.history) action.history.push(`/admin/eventos/edit/${resp.response._id}`)
                        return saveDraftEventSuccess({ ...resp.response, new: true })
                    }),
                    //delay(5000),
                    //takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {
                        toastr.error("Ocurrio un error, vulve a intentar")
                        return of(saveDraftEventError(err))
                    })
                )
            )
        })
    )

}

//thunks
// modules
export function addModuleAction(item) {
    return function (dispatch) {
        // dispatch(addModule())
        return axios.post(baseURL + "eventModules", item, { headers: { Authorization: localStorage.authToken } })
            .then(res => {
                dispatch(addModuleSuccess(res.data))
                toastr.info("Evento actualizado")
                return res.data
            })
            .catch(e => {
                dispatch(addModuleError(e.response.data.message))
                toastr.error(e.response.data.message)
                return e
            })

    }
}

export function removeModuleAction(item) {
    return function (dispatch) {
        // dispatch(removeModule())
        return axios.delete(baseURL + "eventModules/" + item._id, { headers: { Authorization: localStorage.authToken } })
            .then(res => {
                dispatch(removeModuleSuccess(res.data))
                toastr.info("Evento actualizado")
                return res.data
            })
            .catch(e => {
                dispatch(removeModuleError(e.response.data.message))
                toastr.error(e.response.data.message)
                return e
            })

    }
}
// activities
export function addActivityAction(item) {
    return function (dispatch) {
        // dispatch(addModule())
        return axios.post(baseURL + "eventActivities", item, { headers: { Authorization: localStorage.authToken } })
            .then(res => {
                dispatch(addActivitySuccess(res.data))
                dispatch({ type: GET_SINGLE_EVENT, payload: res.data.event })
                toastr.info("Evento actualizado")
                return res.data
            })
            .catch(e => {
                dispatch(addActivityError(e.response ? e.response.data.message : e))
                toastr.error(e.response ? e.response.data.message : 'Error al crear')
                return e
            })

    }
}

export function removeActivityAction(item) {
    return function (dispatch) {
        // dispatch(removeModule())
        return axios.delete(baseURL + "eventActivities/" + item._id, { headers: { Authorization: localStorage.authToken } })
            .then(res => {
                dispatch(removeActivitySuccess(res.data))
                dispatch({ type: GET_SINGLE_EVENT, payload: res.data.event })
                toastr.info("Evento actualizado")
                return res.data
            })
            .catch(e => {
                dispatch(removeActivityError(e.response.data.message))
                toastr.error(e.response.data.message)
                return e
            })

    }
}

export function deleteEventAction(id) {
    return function (dispatch) {
        // dispatch(removeModule())
        return axios.delete(baseURL + "events/" + id, { headers: { Authorization: localStorage.authToken } })
            .then(() => {
                dispatch(deleteEventSuccess())
                toastr.warning("Evento Elimiado")
                return
            })
            .catch(e => {
                dispatch(deleteEventError(e.response.data.message))
                toastr.error(e.response.data.message)
                return e
            })

    }
}

// empty
export function emptyWorkingOn() {
    return (dispatch) => dispatch({ type: "EMPTY_WORKING_ON" })
}

// Add Speaker
export const addSpeakerAction = (eventId, speakerData) => (dispatch) => {
    dispatch(addSPeaker())
    return addSpeakerToEvent(eventId, speakerData)
        .then((data) => {
            dispatch(addSPeakerSuccess(data));
            return data;
        })
        .catch((error) => {
            dispatch(addSPeakerError(error));
            return error;
        })
}

// Update activity
export const updateEventActivityAction = (activityId, activityData) => (dispatch) => {
    dispatch(updateEventActivity())
    return patchEventActivity(activityId, { ...activityData, speakers: activityData.speakers.map(s => ({ _id: s._id })) })
        .then((data) => {
            dispatch(updateEventActivitySuccess(data));
            dispatch({ type: GET_SINGLE_EVENT, payload: data.event })
            return data;
        })
        .catch((error) => {
            dispatch(updateEventActivityError(error));
            return error;
        })
}

// Update event module
export const updateEventModuleAction = (moduleId, moduleData) => (dispatch) => {
    dispatch(updateEventModule())
    return patchEventModule(moduleId, moduleData)
        .then((data) => {
            dispatch(updateEventModuleSuccess(data))
            dispatch({ type: GET_SINGLE_EVENT, payload: data.event })
            return data
        })
        .catch((error) => {
            dispatch(updateEventModuleError(error))
            return error
        })
}

//reducers
function draftEvents(
    state = initialState.draftEvents, // {}
    action
) {
    switch (action.type) {
        case RESET_ADMIN:
            return { ...state, fetching: false, status: "idle" }
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
let initialWorkingOn = {
    mainImages: null,
    permisos: null,
    speakers: [],
    cost: {
        freeCost: 0,
        residentCost: 0,
        socioCost: 0,
    },
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
    title: '',
    startDate: null,
    startTime: '',
    endDate: '',
    description: [null, null, null],
    mainImagesURLS: [],
    permisosURLS: [],
    constanciasURLS: [],
    status: "draft",
    fetching: false,
    modules: [],
    activities: []

}
function workingOn(
    state = initialWorkingOn, // {}
    action
) {
    switch (action.type) {
        /* Add Speaker to event */
        case ADD_SPEAKER:
            return { ...state, fetching: true }
        case ADD_SPEAKER_SUCCESS:
            return {
                ...state, fetching: false, status: 'success',
                speakers: [action.payload, ...state.speakers]
            }
        case ADD_SPEAKER_ERROR:
            return { ...state, fetching: false, status: 'error' }
        case DELETE_EVENT_SUCCESS:
            return { ...initialWorkingOn, fetching: false }
        case DELETE_EVENT_ERROR:
            return { ...state, fetching: false, status: "error" }

        case ADD_ACTIVITY:
            return { ...state, fetching: true }
        case ADD_ACTIVITY_ERROR:
            return { ...state, status: "error", error: action.payload, fetching: false }
        case ADD_ACTIVITY_SUCCESS:
            return { ...state, status: "success", activities: [action.payload, ...state.activities], fetching: false }


        case REMOVE_ACTIVITY:
            return { ...state, fetching: true }
        case REMOVE_ACTIVITY_ERROR:
            return { ...state, status: "error", error: action.payload, fetching: false }
        case REMOVE_ACTIVITY_SUCCESS:
            return { ...state, status: "success", fetching: false }


        case ADD_MODULE:
            return { ...state, fetching: true }
        case ADD_MODULE_ERROR:
            return { ...state, status: "error", error: action.payload, fetching: false }
        case ADD_MODULE_SUCCESS:
            return { ...state, status: "success", modules: [action.payload, ...state.modules], fetching: false }


        case REMOVE_MODULE:
            return { ...state, fetching: true }
        case REMOVE_MODULE_ERROR:
            return { ...state, status: "error", error: action.payload, fetching: false }
        case REMOVE_MODULE_SUCCESS:
            return { ...state, status: "success", modules: [...state.modules.filter(m => m._id !== action.payload._id)], fetching: false }

        case "EMPTY_WORKING_ON":
            return initialWorkingOn
        case UPDATE_WORKING_ON:
            return { ...state, ...action.payload, fetching: false }
        case SAVE_DRAFT_EVENT_SUCCESS:
            return { ...action.payload, fetching: false }
        case SAVE_DRAFT_EVENT_ERROR:
            return { ...state, fetching: false, error: action.payload }
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
