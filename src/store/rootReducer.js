import { combineReducers } from 'redux';
//import userReducer from './userReducer';
import eventReducer from './eventReducer';
import publicationReducer from './publicationReducer';
import userDuck from './ducks/userDuck';

export default combineReducers({
  user: userDuck,
  events: eventReducer,
  publications: publicationReducer,
});
