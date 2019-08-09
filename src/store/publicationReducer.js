import { UPDATE_PUBLICATIONS } from './actions';

const eventsState = {
  publications: [],
  imagesVideos: [],
  image64: null,
  files: [],
  urls: [],
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
