import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { loginUserEpic, persistEpic, hydrateEpic } from './ducks/userDuck';
//import userReducer from './userReducer';
import eventsDuck, { getAdminEventsEpic } from './ducks/eventsDuck';
import { getUsersEpic } from './ducks/users';
import publicationsDuck from './ducks/publicationsDuck';
import userDuck from './ducks/userDuck';
import usersReducer from './ducks/users';
import sigupDuck from './ducks/signupDuck';
import institutionsDuck from './ducks/institutionsDuck';
import activitiesDuck from './ducks/activitiesDuck';
import educationDuck from './ducks/educationDuck';
import resourceDuck from './ducks/resourceDuck';
import configReducer from './ducks/configDuck';
import paymentDuck from './ducks/paymentsDuck';
import invoicesDuck from './ducks/invoicesDuck';
import coursesDuck from './ducks/coursesDuck';
import testsDuck,{saveTestEpic, getAllTestsEpic, getSingleTestEpic, deleteTestEpic} from './ducks/testsDuck'
import adminReducer, { saveDraftEventEpic, getSingleEventEpic } from './ducks/adminDuck'

window.thunkErrorGenerator = function(state, error) {
    return { ...state, fetching: false, status: 'error',  error }
}

window.errorDestructure = function(error, customMessage = 'Ocurrio un error.') {
    const { response = {} } = error;

    if (process.env.REACT_APP_DEVELOP) console.log('\x1b[36m', error.response, error);

    const { data = { message: customMessage } } = response;
    const message = data.error || data.message;
    return message;
}

let rootReducer = combineReducers({
    user: userDuck,
    events: eventsDuck,
    publications: publicationsDuck,
    users: usersReducer,
    signup: sigupDuck,
    config: configReducer,
    admin: adminReducer,
    institutions: institutionsDuck,
    activities: activitiesDuck,
    education: educationDuck,
    tests: testsDuck,
    resources: resourceDuck,
    payment: paymentDuck,
    invoice: invoicesDuck,
    course: coursesDuck,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(() => of({ type: "EPIC" }),
    loginUserEpic,
    persistEpic,
    hydrateEpic,
    getUsersEpic,
    saveDraftEventEpic,
    getSingleEventEpic,
    getAdminEventsEpic,
    saveTestEpic,
    getAllTestsEpic,
    getSingleTestEpic,
    deleteTestEpic
)

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic);
// initial search
store.dispatch({ type: "LOOK_FOR_SAVED_DATA" })

export default store;