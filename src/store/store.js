import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { loginUserEpic, persistEpic, hydrateEpic } from './ducks/userDuck';
//import userReducer from './userReducer';
import eventsDuck from './ducks/eventsDuck';
import { getUsersEpic } from './ducks/users';
import publicationsDuck from './ducks/publicationsDuck';
import userDuck from './ducks/userDuck';
import usersReducer from './ducks/users';
import sigupDuck from './ducks/signupDuck';
import configReducer from './ducks/configDuck'
import adminReducer, { saveDraftEventEpic } from './ducks/adminDuck'

let rootReducer = combineReducers({
    user: userDuck,
    events: eventsDuck,
    publications: publicationsDuck,
    users: usersReducer,
    signup: sigupDuck,
    config: configReducer,
    admin: adminReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(() => of({ type: "EPIC" }),
    loginUserEpic,
    persistEpic,
    hydrateEpic,
    getUsersEpic,
    saveDraftEventEpic,

)

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic);

export default store;