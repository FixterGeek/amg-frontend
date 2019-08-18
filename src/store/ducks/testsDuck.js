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
import toastr from 'toastr'

let baseURL = process.env.REACT_APP_BASE_API_URL

const initialState={
    test: {
        event:'',
        title:'',
        date:'',
        beginingTime:'',
        endTime:'',
        questions:[{
            question:'quien se comió la kk del caba?',
            answers:[
                'yo',
                'tu',
                'lol',
                'ño'
            ],
            correct:'yo'
        }],
    },
    tests:[],
    fetching:false,
    status:'idle',
    error:{}
}



// Action Types

const GET_TESTS = 'GET_TESTS';
const GET_TESTS_SUCCESS = 'GET_TESTS_SUCCESS';
const GET_TESTS_ERROR = 'GET_TESTS_ERROR';

const GET_TEST = 'GET_TEST';
const GET_TEST_SUCCESS = 'GET_TEST_SUCCESS';
const GET_TEST_ERROR = 'GET_TEST_ERROR';

const SAVE_TEST = 'SAVE_TEST';
const SAVE_TEST_SUCCESS = 'SAVE_TEST_SUCCESS';
const SAVE_TEST_ERROR = 'SAVE_TEST_ERROR';

const WRITING_TEST = 'WRITING_TEST';

const UPDATE_TEST = 'UPDATE_TEST';
const UPDATE_TEST_SUCCESS = 'UPDATE_TEST_SUCCESS';
const UPDATE_TEST_ERROR = 'UPDATE_TEST_ERROR';

const DELETE_TEST = 'DELETE_TEST';
const DELETE_TEST_SUCCESS = 'DELETE_TEST_SUCCESS';
const DELETE_TEST_ERROR = 'DELETE_TEST_ERROR';

//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case WRITING_TEST:
            return { ...state, test:{...action.payload}}
        case GET_TESTS:
            return { ...state, status: "fetching", fetching: true }
        case GET_TESTS_SUCCESS:
            return { tests: [...action.payload], status: "success", fetching: false }
        case GET_TESTS_ERROR:
            return { ...state, status: "error", fetching: false, error: action.payload }      
        case GET_TEST:
            return { ...state, status: "fetching", fetching: true }
        case GET_TEST_SUCCESS:
            return { test: {...action.payload}, status: "success", fetching: false }
        case GET_TEST_ERROR:
            return { ...state, status: "error", fetching: false, error: action.payload }
        case SAVE_TEST:
            return { ...state, status: "fetching", fetching: true }
        case SAVE_TEST_SUCCESS:
            return { ...state, test:{...action.payload},tests:[...state.tests,action.payload], status: "success", fetching: false }
        case SAVE_TEST_ERROR:
                return { ...state, status: "error", fetching: false, error: action.payload }
        default:
            return state;
    }
  }
  
  export default reducer;

//action creators
export function writingTest(test) {
    return {
        type: WRITING_TEST,
        payload: test
    }
}
export function saveTest(test){
    return {
        type: SAVE_TEST,
        payload: test
    }
}
export function saveTestSuccess(test) {
    return {
        type: SAVE_TEST_SUCCESS,
        payload: test
    }
}
export function saveTestError(error) {
    return {
        type: SAVE_TEST_SUCCESS,
        payload: error
    }
}


//epics

export function saveDraftTestEpic(action$, state$) {
    return action$.pipe(
        ofType(SAVE_TEST),        
        withLatestFrom(state$.pipe(pluck('user'))),
        switchMap(([action, { token }]) => {
            if (action.payload._id) {
                return concat(
                    //of(setFetchingUser()),
                    ajax.patch(`${baseURL}/exams/${action.payload._id}`, action.payload, { "Authorization": token }).pipe(
                        map(resp => {
                            console.log(resp)
                            //localStorage.authToken = resp.response.token
                            toastr.success("Test Guardado")
                            return saveTestSuccess({ ...resp.response })
                        }),
                        //delay(5000),
                        //takeUntil(action$.pipe(ofType("CANCEL"))),
                        catchError(err => {
                            console.log("ero", err)
                            return of(saveTestError(err))
                        })
                    )
                )
            }            
            return concat(
                //of(setFetchingUser()),
                ajax.post(baseURL + "/exams", action.payload.body, { "Authorization": token }).pipe(
                    map(resp => {                        
                        //localStorage.authToken = resp.response.token
                        toastr.success("Nuevo Evento Guardado")
                        return saveTestSuccess({ ...resp.response, new: true })
                    }),
                    //delay(5000),
                    //takeUntil(action$.pipe(ofType("CANCEL"))),
                    catchError(err => {                        
                        toastr.error("Ocurrio un error, vulve a intentar")
                        return of(saveTestError(err))
                    })
                )
            )
        })
    )

}