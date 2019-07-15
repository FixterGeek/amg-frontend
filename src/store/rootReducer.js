import { combineReducers } from 'redux';
import userReducer from './userReducer';
import eventReducer from './eventReducer';
import publicationReducer from './publicationReducer';

export default combineReducers({
  user: userReducer,
  events: eventReducer,
  publications: publicationReducer,
});
