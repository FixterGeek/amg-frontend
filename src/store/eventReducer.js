import { UPDATE_EVENTS } from './actions';

const eventsState = {
  events: [],
};

function eventReducer(state = eventsState, action) {
  switch (action.type) {
    case UPDATE_EVENTS:
      return { ...state, ...action.value };
    default:
      return state;
  }
}

export default eventReducer;
