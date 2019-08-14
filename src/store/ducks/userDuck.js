import { combineReducers } from 'redux';
import { login, updateUser as update } from '../../services/userServices'
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
};


// Constants
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

// actionCreators
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
                        localStorage.authToken = resp.response.token
                        return loginUserSuccess({ ...resp.response.user, token: resp.response.token })
                    }),
                    //delay(5000),
                    takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {
                        console.log("ero", err)
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
            console.log(err)
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
            return data;
        })
        .catch(({ response }) => {
            dispatch(updateUserError(response.data));
            return response;
        })
}


// logout
export const logoutAction = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        localStorage.removeItem('user');
        dispatch(logoutUser());
        resolve(true);
    });
};

// reducer
function reducer(state = userState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, fetching: true };
        case UPDATE_USER_SUCCESS:
            return { ...state, ...action.payload, fetching: false };
        case UPDATE_USER_ERROR:
            return { ...state, fetching: false, error: action.payload.message };
        case SET_FETCHING_USER:
            return { ...state, fetching: true }
        case LOGIN_USER_SUCCESS:
            return { ...action.payload, fetching: false, isLogged: true }
        case LOGIN_USER_ERROR:
            let error
            if (action.payload === "IncorrectPasswordError") error = "Nombre de usuario o contraseña incorrectos"
            return { ...userState, fetching: false, error }
        case CREATE_USER:
            return { ...userState, fetching: true }
        case CREATE_USER_SUCCESS:
            return { ...action.payload, fetching: false }
        case CREATE_USER_ERROR:
            return { ...userState, fetching: false, error: true }
        case LOGOUT_USER:
            return { ...userState };
        default:
            return state;
    }
}


// exportacion
export default reducer;
