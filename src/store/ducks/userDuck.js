import {
    login, updateUser as update, signup,
    followUser as follow,
    getSelfUser,
} from '../../services/userServices'
import { activitySubscribe, assistAnEvent } from '../../services/eventsServices';
import {
    switchMap,
    map,
    filter,
    catchError,
    takeUntil,
    withLatestFrom,
    pluck,
    tap,
    ignoreElements
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { concat, of, EMPTY } from 'rxjs'
import { ofType } from 'redux-observable';
import useSweet from '../../hooks/useSweetAlert';
import { errorAction, successAction } from './tools';

const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;

// inital data
const userState = {
  email: null,
  basicData: {
    name: null,
    darSurname: null,
    momSurname: null,
    birthDate: null,
    placeOfBirth: {},
    speciality: null,
    photoURL: null,
    phone: null,
    civilStatus: null,
    adress: {},
  },
  following: [],
  followers: [],
  assistedEvents: [],
  assistedActivities: [],
  spouse: {},
  fiscalData: {},
  registrationDate: null,
  userStatus: null,
  revisonDate: null,
  reviwedBy: null,
  membersWhoRecommend: [],
  workedAtInstitutions: [],
  consultories: [],
  studies: [],
  interships: [],
  residencies: [],
  teachingActivities: [],
  medicalSocieties: [],
  createdAt: null,
  updatedAt: null,
  _id: null,
  fetching: false,
  isLogged: false,
  status: null,
};


// Constants
let FETCHING = "USER/FETCHING";
let FETCHING_ERROR = "USER/FETCHING_ERROR";
let RESET_USER_STATUS = 'RESET_USER_STATUS';
let CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
let CREATE_USER = "CREATE_USER"
let CREATE_USER_ERROR = "CREATE_USER_ERROR"
let LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
let LOGIN_USER = "LOGIN_USER"
let LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
let SET_FETCHING_USER = "SET_FETCHING_USER"
let LOGOUT_USER = "LOGOUT_USER"
let UPDATE_USER = "UPDATE_USER"
let UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
let UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
let SUBSCRIBE_USER_TO_ACTIVITY = "SUBSCRIBE_USER_TO_ACTIVITY"
let SUBSCRIBE_USER_TO_ACTIVITY_SUCCESS = "SUBSCRIBE_USER_TO_ACTIVITY_SUCCESS"
let SUBSCRIBE_USER_TO_ACTIVITY_ERROR = "SUBSCRIBE_USER_TO_ACTIVITY_ERROR"
let SUBSCRIBE_USER_TO_EVENT = "SUBSCRIBE_USER_TO_TEVENT";
let SUBSCRIBE_USER_TO_EVENT_SUCCESS = "SUBSCRIBE_USER_TO_EVENT_SUCCESS"
let SUBSCRIBE_USER_TO_EVENT_ERROR ="SUBSCRIBE_USER_TO_EVENT_ERROR"
let FOLLOW_USER = 'FOLLOW_USER'
let FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'
let FOLLOW_USER_ERROR = 'FOLLOW_USER_ERROR'
let POPULATE_FOLLOWS_USERS = 'POPULATE_FOLLOWS_USERS';

// actionCreators
export const fetching = () => ({ type: FETCHING });
export const fetchingError = error => ({ type: FETCHING_ERROR, payload: error });

export const populateFollowsAction = ({ following, followers }) => ({
    type: POPULATE_FOLLOWS_USERS, payload: { following, followers },
})
export function resetUserStatus() {
    return { type: RESET_USER_STATUS };
}

export function subscribeUserToEvent() {
    return { type: SUBSCRIBE_USER_TO_EVENT };
}

export function subscribeUserToEventSuccess(eventData) {
    return { type: SUBSCRIBE_USER_TO_EVENT_SUCCESS, payload: eventData };
}

export function subscribeUserToEventError(error) {
    return { type: SUBSCRIBE_USER_TO_EVENT_ERROR, payload: error };
}


export function updateUser() {
    return { type: UPDATE_USER };
}

export function updateUserSuccess(userData) {
    return { type: UPDATE_USER_SUCCESS, payload: userData };
}

export function updateUserError(error) {
    return { type: UPDATE_USER_ERROR, payload: error };
}


export function createUser() {
    return {
        type: CREATE_USER
    };
}
export function createUserError(payload) {
    return {
        type: CREATE_USER_ERROR,
        payload
    };
}
export function createUserSuccess(payload) {
    return {
        type: CREATE_USER_SUCCESS,
        payload
    };
}
export function loginUser(auth) {
    return {
        type: LOGIN_USER,
        payload: auth
    };
}
export function setFetchingUser() {
    return {
        type: SET_FETCHING_USER
    };
}
export function loginUserError(errorMessage) {
    return {
        type: LOGIN_USER_ERROR,
        payload: errorMessage
    };
}
export function loginUserSuccess(userData) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: userData
    };
}

export function logoutUser() {
    return { type: LOGOUT_USER };
}

export function subscribeUserToActivity() {
    return { type: SUBSCRIBE_USER_TO_ACTIVITY }
}

export function subscribeUserToActivitySuccess(userData) {
    return { type: SUBSCRIBE_USER_TO_ACTIVITY_SUCCESS, payload: userData };
}

export function subscribeUserToActivityError(error) {
    return { type: SUBSCRIBE_USER_TO_ACTIVITY_ERROR, payload: error };
}

/* Follow user actions creators */
export function followUser() {
    return { type: FOLLOW_USER };
}

export function followUserSuccess(followData) {
    return { type: FOLLOW_USER_SUCCESS, payload: followData };
}

export function followUserError(error) {
    return { type: FOLLOW_USER_ERROR, payload: error };
}

// EPICS
export function persistEpic(action$, state$) {
    return action$.pipe(
        ofType(LOGIN_USER_SUCCESS),
        withLatestFrom(state$.pipe(pluck('user'))),
        tap(([action, user]) => {
            localStorage.user = JSON.stringify(user)
        }),
        ignoreElements()
    )
}

export function hydrateEpic() {
    let user = localStorage.user
    if (typeof user === "string") {
        try {
            let parsed = JSON.parse(user)
            return of(loginUserSuccess(parsed))
        } catch (e) {
            return EMPTY
        }
    }
    return EMPTY
}

export function loginUserEpic(action$) {
    return action$.pipe(
        ofType(LOGIN_USER),
        //debounceTime(500),
        filter(({ payload }) => typeof payload === "object" && payload.password !== "" && payload.email !== ""),
        switchMap(action => {
            return concat(
                of(setFetchingUser()),
                ajax.post(baseAuthURL + "/login", action.payload, { 'Content-Type': 'application/json' }).pipe(
                    map(resp => {
                        localStorage.authToken = resp.response.token;
                        return loginUserSuccess({ ...resp.response.user, token: resp.response.token })
                    }),
                    //delay(5000),
                    takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {
                        return of(loginUserError(err.response.name))
                    })
                )
            )
        })
    )

}

// thunks
//login

export const loginUserAction = (auth) => (dispatch) => {
    dispatch(loginUser())
    return login(auth)
        .then(data => {
            dispatch(loginUserSuccess(data.user))
            localStorage.authToken = data.token
            return data
        })
        .catch(err => {
            dispatch(loginUserError(err))
        })
}

// update user
export const updateUserAction = (userData) => (dispatch) => {
    dispatch(updateUser());
    return update(userData)
        .then((data) => {
            localStorage.user = JSON.stringify(data);
            dispatch(updateUserSuccess(data));
            useSweet().successAlert({ title: 'Datos actualizados' });
            dispatch({ type: RESET_USER_STATUS });
            return data;
        })
        .catch(({ response }) => {
            dispatch(updateUserError(response.data));
            useSweet().errorAlert({});
            dispatch({ type: RESET_USER_STATUS });
            return response;
        })
}

// subscribe user to activity
export const subscribeUserToActivityAction = (eventId) => (dispatch) => {
    dispatch(subscribeUserToActivity());
    return activitySubscribe(eventId)
        .then((data) => {
            const currentUser = JSON.parse(localStorage.user);
            currentUser.assistedActivities = [...currentUser.assistedActivities, data._id]
            localStorage.user = JSON.stringify(currentUser);
            dispatch(subscribeUserToActivitySuccess(currentUser));
            return data;
        })
        .catch((error) => {
            dispatch(subscribeUserToActivityError(error));
            return error;
        })
}

export const subscribeUserToEventAction = (eventId) => (dispatch) => {
    dispatch(subscribeUserToEvent());
    return assistAnEvent(eventId)
        .then((data) => {
            const currentUser = JSON.parse(localStorage.user);
            currentUser.assistedEvents = [...currentUser.assistedEvents, data._id];
            localStorage.user = JSON.stringify(currentUser);
            dispatch(subscribeUserToEventSuccess(currentUser));
            useSweet().successAlert({ text: 'Hemos enviado la reservación a tu correo. Recuerda que también puedes consultarla desde mis eventos.' });
            return data;
        })
        .catch((error) => {
            if (error.response) dispatch(subscribeUserToEventError(error.response.data.message));
            else dispatch(subscribeUserToEventError(error));
            return error;
        });
}


// logout
export const logoutAction = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        localStorage.clear(); 
        dispatch(logoutUser());
        resolve(true);
    });
};

export const createUserAction = (userData) => (dispatch) => {
    dispatch(createUser())
    return signup(userData)
        .then((data) => {
            localStorage.authToken = data.token;
            localStorage.user = JSON.stringify(data.user);
            dispatch(createUserSuccess(data.user));
            dispatch({ type: RESET_USER_STATUS });;
            return data
        })
        .catch((error) => {
            return errorAction(
                dispatch, createUserError, error, RESET_USER_STATUS, 'Error al registrar',
            )
        })
}

export const followUserAction = (userId, followType) => (dispatch) => {
    dispatch(followUser());
    return follow(userId)
        .then((data) => {
            const localUser = JSON.parse(localStorage.user);
            let localFollowing = localUser.following ? localUser.following : [];

            if (followType) localFollowing = [...localFollowing, data.following];
            else localFollowing = localFollowing.filter(item => item._id !== data.following._id);

            localUser.following = localFollowing;
            localStorage.user = JSON.stringify(localUser);

            dispatch(followUserSuccess(localFollowing));
            return data;
        })
        .catch((error) => {
            dispatch(followUserError(error));
            return error;
        })
}

export const populateFollows = follows => (dispatch) => {
    dispatch(fetching());
    return getSelfUser()
        .then(data => successAction(
            dispatch, populateFollowsAction, data, RESET_USER_STATUS, false,
        ))
        .catch(error => errorAction(
            dispatch, fetchingError, error, RESET_USER_STATUS, 'Ocurrio un error',
        ));
}

// reducer
function reducer(state = userState, action) {
    switch (action.type) {
        case RESET_USER_STATUS:
            return { ...state, status: null, fetching: false }
        case FETCHING_ERROR:
            return {
                ...state, fetching: false, status: 'error', error: action.payload,
            }
        case FETCHING:
            return {
                ...state, fetching: true,
            }
        case UPDATE_USER:
            return { ...state, fetching: true };
        case UPDATE_USER_SUCCESS:
            return { ...state, ...action.payload, fetching: false, status: 'success' };
        case UPDATE_USER_ERROR:
            return { ...state, fetching: false, error: action.payload.message, status: 'error' };
        case SET_FETCHING_USER:
            return { ...state, fetching: true }
        case LOGIN_USER_SUCCESS:
            return { ...action.payload, fetching: false, isLogged: true }
        case LOGIN_USER_ERROR:
            let error
            if (action.payload === "IncorrectPasswordError" || action.payload === "IncorrectUsernameError") error = "Nombre de usuario o contraseña incorrectos"
            return { ...state, status: 'error', error, fetching: false }
        case CREATE_USER:
            return { ...state, fetching: true }
        case CREATE_USER_SUCCESS:
            return { ...action.payload, fetching: false, status: 'success', isLogged: true }
        case CREATE_USER_ERROR:
            return { ...state, fetching: false, error: true }
        case LOGOUT_USER:
            return { ...userState };
        /* Subscribe to activity */
        case SUBSCRIBE_USER_TO_ACTIVITY:
            return { ...state, fetching: true };
        case SUBSCRIBE_USER_TO_ACTIVITY_SUCCESS:
            return { ...state, ...action.payload, fetching: false };
        case SUBSCRIBE_USER_TO_ACTIVITY_ERROR:
            return { ...state, fetching: false, error: action.payload };
        /* Subscribe to event */
        case SUBSCRIBE_USER_TO_EVENT:
            return { ...state, fetching: true };
        case SUBSCRIBE_USER_TO_EVENT_SUCCESS:
            return { ...state, ...action.payload, fetching: false };
        case SUBSCRIBE_USER_TO_EVENT_ERROR:
            return { ...state, fetching: false, error: action.payload };
        /* Follow user */
        case FOLLOW_USER:
            return { ...state, fetching: true };
        case FOLLOW_USER_SUCCESS:
            return {
                ...state,
                fetching: false,
                status: 'success',
                following: [...action.payload],
            }
        case FOLLOW_USER_ERROR:
            return { ...state, fetching: false, status: 'error', error: action.payload };
        case POPULATE_FOLLOWS_USERS:
            return {
                ...state, followers: action.payload.followers,
                following: action.payload.following,
                status: 'success',
            }
        default:
            return state;
    }
}


// exportacion
export default reducer;
