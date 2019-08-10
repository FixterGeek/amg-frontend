import { combineReducers } from 'redux';
import userDuck from './ducks/userDuck';
import eventsDuck from './ducks/eventsDuck';
import publicationsDuck from './ducks/publicationsDuck';

export default combineReducers({
  user: userDuck,
  events: eventsDuck,
  publications: publicationsDuck,
});
