import { UPDATE_PUBLICATIONS } from './actions';

const eventsState = {
  publications: [],
};

function publicationReducer(state = eventsState, action) {
  switch (action.type) {
    case UPDATE_PUBLICATIONS:
      return { ...state, ...action.value };
    default:
      return state;
  }
}

export default publicationReducer;
