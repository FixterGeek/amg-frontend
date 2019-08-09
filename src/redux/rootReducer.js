import { combineReducers } from 'redux';
//import userReducer from './userReducer';
import eventReducer from './eventReducer';
import publicationReducer from './publicationReducer';
import usersReducer from './users/reducer'
import userDuck from './ducks/userDuck';

export default combineReducers({
  user: userDuck,
  events: eventReducer,
  publications: publicationReducer,
  users:usersReducer,
});
