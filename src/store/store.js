import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import userDuck, { loginUserEpic, persistEpic, hydrateEpic } from './ducks/userDuck';
import eventDuck from './ducks/eventsDuck';
import publicationDuck from './ducks/publicationsDuck';

let rootReducer = combineReducers({
  user: userDuck,
  events: eventDuck,
  publications: publicationDuck,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(() => of({ type: 'EPIC' }), loginUserEpic, persistEpic, hydrateEpic);

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic);

export default store;
