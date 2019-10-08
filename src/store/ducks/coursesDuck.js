import {
  getCoursesForEvent,
  patchCourse,
  deleteCourse,
  postCourse,
} from '../../services/coursesServices';
import useSweet from '../../hooks/useSweetAlert';
import { dispatch } from 'rxjs/internal/observable/pairs';

import HardCourses from '../../components/events/HardCourses.json';

const courseState = {
  array: [],
  noData: false,
  fetching: false,
  status: null,
};


/* Constants */
const RESET_COURSES_SATUS = 'RESET_COURSES_STATUS';

const POPULATE_EVENT_COURSES = 'POPULATE_EVENT_COURSES';
const POPULATE_EVENT_COURSES_SUCCESS = 'POPULATE_EVENT_COURSES_SUCCESS';
const POPULATE_EVENT_COURSES_ERROR = 'POPULATE_EVENT_COURSES_ERROR';


/* Actios Creators */
export function resetCoursesStatus() {
  return { type: RESET_COURSES_SATUS };
}

// Ppopulate Events Courses
function populateEventCourses() {
  return { type: POPULATE_EVENT_COURSES };
}

function populateEventCoursesSuccess(coursesArray) {
  return { type: POPULATE_EVENT_COURSES_SUCCESS, payload: coursesArray };
}

function populateEventCoursesError(error) {
  return { type: POPULATE_EVENT_COURSES_ERROR, payload: error };
}


/* Thunk */
export const populateEventCoursesAction =  eventId => (dispatch) => {
  dispatch(populateEventCourses());
  dispatch(populateEventCoursesSuccess(HardCourses));
  // return getCoursesForEvent(eventId)
  //   .then((coursesArray) => {
  //     dispatch(populateEventCoursesSuccess(coursesArray));
  //     dispatch({ type: RESET_COURSES_SATUS });
  //     return coursesArray;
  //   })
  //   .catch((error) => {
  //     const { response = {} } = error;
  //     const { data = {} } = response;
  //     useSweet().infoAlert({ text: data.message || 'Los cursos no estan disponibles' });
  //     dispatch(populateEventCoursesError(data.message || error));
  //     dispatch({ type: RESET_COURSES_SATUS })
  //     return error;
  //   })
}

/* reducer */
export default function reducer(state = courseState, action) {
  switch (action.type) {
    /* RESET */
    case RESET_COURSES_SATUS:
      return { ...state, fetching: false, status: null };
    case POPULATE_EVENT_COURSES:
      return { ...state, fetching: true };
    case POPULATE_EVENT_COURSES_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: [...action.payload], noData: action.payload.length === 0,
      };
    case POPULATE_EVENT_COURSES_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    default:
      return state;
  }
}