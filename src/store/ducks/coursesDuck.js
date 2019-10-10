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

const CREATE_EVENT_COURSE = 'CREATE_EVENT_COURSE';
const CREATE_EVENT_COURSE_SUCCESS = 'CREATE_EVENT_COURSE_SUCCESS'
const CREATE_EVENT_COURSE_ERROR = 'CREATE_EVENT_COURSE_ERROR';

const UPDATE_EVENT_COURSE = 'UPDATE_EVENT_COURSE';
const UPDATE_EVENT_COURSE_SUCCESS = 'UPDATE_EVENT_COURSE_SUCCESS'
const UPDATE_EVENT_COURSE_ERROR = 'UPDATE_EVENT_COURSE_ERROR';


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

// Create event course
function createEventCourse() {
  return { type: CREATE_EVENT_COURSE };
}

function createEventCourseSuccess(courseData) {
  return { type: CREATE_EVENT_COURSE_SUCCESS, payload: courseData };
}

function createEventCourseError(error) {
  return { type: CREATE_EVENT_COURSE_ERROR, payload: error };
}

// UPDATE event course
function updateEventCourse() {
  return { type: UPDATE_EVENT_COURSE };
}

function updateEventCourseSuccess(courseData) {
  return { type: UPDATE_EVENT_COURSE_SUCCESS, payload: courseData };
}

function updateEventCourseError(error) {
  return { type: UPDATE_EVENT_COURSE_ERROR, payload: error };
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

// Create event course
export const createOrUpdateEventCourseAction = (coursePayload, actionType) => (dispatch) => {
  dispatch(actionType === 'create' ? createEventCourse() : updateEventCourse());
  if (actionType === 'create') return postCourse(coursePayload)
    .then((courseData) => {
      useSweet().successAlert({ text: 'Curso creado' });
      dispatch(createEventCourseSuccess(courseData));
      dispatch({ type: RESET_COURSES_SATUS })
      return courseData;
    })
    .catch((error) => {
      const errorMessage = window.errorDestructure(error, 'No fue posible crear el curso');
      useSweet().errorAlert({ text: errorMessage });
      dispatch(createEventCourseError(errorMessage));
      dispatch({ type: RESET_COURSES_SATUS })
      return error;
    })
}

/* reducer */
export default function reducer(state = courseState, action) {
  switch (action.type) {
    /* RESET */
    case RESET_COURSES_SATUS:
      return { ...state, fetching: false, status: null };
    /* Populate event course */
    case POPULATE_EVENT_COURSES:
      return { ...state, fetching: true };
    case POPULATE_EVENT_COURSES_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: [...action.payload], noData: action.payload.length === 0,
      };
    case POPULATE_EVENT_COURSES_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    /* Create event course */
    case CREATE_EVENT_COURSE:
      return { ...state, fetching: true };
    case CREATE_EVENT_COURSE_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: [action.payload ,...state.array],
      };
    case CREATE_EVENT_COURSE_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    default:
      return state;
  }
}