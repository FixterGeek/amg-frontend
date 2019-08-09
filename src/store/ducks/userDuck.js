import { combineReducers } from 'redux'
import { signup, login } from '../../services/userService'
import { switchMap, map, debounceTime, filter } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { concat, of } from 'rxjs'
import { ofType } from 'redux-observable';

const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;

//inital data
const userState = {
    name: '',
    dadSurName: '',
    momSurName: '',
    email: '',
    password: '',
    birthDate: '',
    basicData: {},
    placeOfBirth: {
        addressName: 'Pachuca',
        street: '',
        outdoorNumber: '',
        interiorNumber: '',
        colony: '',
        zipCode: '',
        city: 'Pachuca',
        state: 'Hidalgo',
        coordinates: ['123312', '123123']
    },
    speciality: '',
    userToken: '',
    phone: '',
    civilStatus: '',
    address: {
        addressName: '',
        street: '',
        outdoorNumber: '',
        interiorNumber: '',
        colony: '',
        zipCode: '',
        city: '',
        state: '',
        coordinates: ['123312', '123123']
    },
    spouse: {
        name: '',
        dadSurname: '',
        momSurname: '',
        email: '',
        phone: ''
    },
    studies: {
        user: '',
        major: '',
        institution: '',
        startDate: '',
        endDate: '',
        receptionDate: '',
        professionalLicence: ''
    },
    internships: {
        user: '',
        institution: '',
        startDate: '',
        endDate: ''
    },
    residences: {
        user: '',
        speciality: '',
        institution: '',
        startDate: '',
        endDate: '',
        specialityLicence: '',
        specialityLicenceCopy: '',
        specialistLicence: '',
        specialityDirectorsCertificates: ''
    },
    fiscalData: {
        rfc: '',
        phone: '',
        email: '',
        address: {
            addressName: '',
            street: '',
            outdoorNumber: '',
            interiorNumber: '',
            colony: '',
            zipCode: '',
            city: '',
            state: '',
            coordinates: ['123312', '123123']
        }
    },
    fetching: false,
    isLogged: false
};


// Constants
let CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
let CREATE_USER = "CREATE_USER"
let CREATE_USER_ERROR = "CREATE_USER_ERROR"
let LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
let LOGIN_USER = "LOGIN_USER"
let LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
let SET_FETCHING_USER = "SET_FETCHING_USER"

// actionCreators
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
export function loginUserError(payload) {
    return {
        type: LOGIN_USER_ERROR,
        payload
    };
}
export function loginUserSuccess(payload) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload
    };
}

// thunks
//login
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
                        return loginUserSuccess(resp.response.user)
                    })
                )
            )
        })
    )

}

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
// signup
export const createUserAction = ({ name, email, password }) => (dispatch) => {
    return // there is no signup in the app, but in the admin
    dispatch(createUser())
    return signup(name, email, password)
        .then(data => {
            dispatch(createUserSuccess(data.user))
            localStorage.authToken = data.token
            return data
        })
        .catch(err => {
            console.log(err)
            dispatch(createUserError(err))
        })
}

// reducer
function reducer(state = userState, action) {
    switch (action.type) {
        case SET_FETCHING_USER:
            return { ...state, fetching: true }
        case LOGIN_USER_SUCCESS:
            return { ...action.payload, fetching: false, isLogged: true }
        case LOGIN_USER_ERROR:
            return { ...userState, fetching: false, error: JSON.stringify(action.payload) }
        case CREATE_USER:
            return { ...userState, fetching: true }
        case CREATE_USER_SUCCESS:
            return { ...action.payload, fetching: false }
        case CREATE_USER_ERROR:
            return { ...userState, fetching: false, error: true }
        default:
            return state;
    }
}



//exportacion
export default reducer