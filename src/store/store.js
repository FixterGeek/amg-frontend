import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { of } from 'rxjs';
import { loginUserEpic, persistEpic, hydrateEpic } from './ducks/userDuck';
import { combineReducers } from 'redux';
//import userReducer from './userReducer';
import eventReducer from './eventReducer';
import { getUsersEpic } from './ducks/users';
import publicationReducer from './publicationReducer';
import userDuck from './ducks/userDuck';

let rootReducer = combineReducers({
    user: userDuck,
    events: eventReducer,
    publications: publicationReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(() => of({ type: "EPIC" }), loginUserEpic, persistEpic, hydrateEpic,getUsersEpic)

const epicMiddleware = createEpicMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic)

const epicMiddleware = createEpicMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic)

export default store;