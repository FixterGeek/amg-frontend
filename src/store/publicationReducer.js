import { UPDATE_PUBLICATIONS } from './actions';

const eventsState = {
  publications: [],
  image: null,
  image64: null,
  file: null,
  fileType: null,
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
