import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { of } from 'rxjs';
import { loginUserEpic } from './ducks/userDuck';
import { getUsersEpic } from './ducks/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(
    () => of({ type: "EPIC" }),
    loginUserEpic,
    getUsersEpic
    )

const epicMiddleware = createEpicMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic)

export default store;