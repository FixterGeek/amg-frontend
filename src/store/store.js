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
import configReducer from './ducks/configDuck'
import adminReducer, { saveDraftEventEpic, getSingleEventEpic } from './ducks/adminDuck'

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
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(() => of({ type: "EPIC" }),
    loginUserEpic,
    persistEpic,
    hydrateEpic,
    getUsersEpic,
    saveDraftEventEpic,
    getSingleEventEpic,
    getAdminEventsEpic
)

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic);
// initial search
store.dispatch({ type: "LOOK_FOR_SAVED_DATA" })

export default store;