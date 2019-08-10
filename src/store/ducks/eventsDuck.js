import { getEvents } from '../../services/eventsServices';

const eventState = {
  events: [],
  fetching: false,
};


// Constants
const POPULATE_EVENTS = 'POPULATE_EVENTS';
const POPULATE_EVENTS_SUCCESS = 'POPULATE_EVENTS_SUCCESS';
const POPULATE_EVENTS_ERROR = 'POPULATE_EVENTS_ERROR';


// actionCreators
export function populateEvents() {
  return { type: POPULATE_EVENTS };
}

export function populateEventsSuccess(payload) {
  return {
    type: POPULATE_EVENTS_SUCCESS,
    payload,
  };
}

export function populateEventsError(payload) {
  return {
    type: POPULATE_EVENTS_ERROR,
    payload,
  };
}


// Thunks
// Populate events
export const populateEventsAction = () => (dispatch) => {
  dispatch(populateEvents());
  return getEvents()
    .then((data) => {
      dispatch(populateEventsSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(populateEventsError(error));
      return error;
    });
};

function reducer(state = eventState, action) {
  switch (action.type) {
    case POPULATE_EVENTS_SUCCESS:
      return { events: [...action.payload], fetching: false };
    case POPULATE_EVENTS_ERROR:
      return { ...eventState, fetching: false, error: true };
    case POPULATE_EVENTS:
      return { ...eventState, fetching: true };
    default:
      return state;
  }
}

export default reducer;
