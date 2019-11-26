import {
  getCoursesForEvent,
  patchCourse,
  deleteCourse,
  postCourse,
  postCourseModule,
  patchCourseModule,
  postActivityForCourseModule,
  patchActivityForCourseModule,
  deleteCourseForModule,
  deleteActivityForCourseModule,
} from '../../services/coursesServices';
import useSweet from '../../hooks/useSweetAlert';
import { successAction, errorAction } from './tools';



const courseState = {
  array: [],
  currentEventId: null,
  noData: false,
  fetching: false,
  status: null,
};


/* Constants */
const RESET_COURSES_SATUS = 'RESET_COURSES_STATUS';
const RESET_COURSE_ARRAY = 'RESET_COURSE_ARRAY';

const POPULATE_EVENT_COURSES = 'POPULATE_EVENT_COURSES';
const POPULATE_EVENT_COURSES_SUCCESS = 'POPULATE_EVENT_COURSES_SUCCESS';
const POPULATE_EVENT_COURSES_ERROR = 'POPULATE_EVENT_COURSES_ERROR';

const CREATE_EVENT_COURSE = 'CREATE_EVENT_COURSE';
const CREATE_EVENT_COURSE_SUCCESS = 'CREATE_EVENT_COURSE_SUCCESS'
const CREATE_EVENT_COURSE_ERROR = 'CREATE_EVENT_COURSE_ERROR';

const UPDATE_EVENT_COURSE = 'UPDATE_EVENT_COURSE';
const UPDATE_EVENT_COURSE_SUCCESS = 'UPDATE_EVENT_COURSE_SUCCESS'
const UPDATE_EVENT_COURSE_ERROR = 'UPDATE_EVENT_COURSE_ERROR';

const DELETE_EVENT_COURSE = 'DELETE_EVENT_COURSE';
const DELETE_EVENT_COURSE_SUCCESS = 'DELETE_EVENT_COURSE_SUCCESS';
const DELETE_EVENT_COURSE_ERROR = 'DELETE_EVENT_COURSE_ERROR';

const ADD_COURSE_MODULE = 'ADD_COURSE_MODULE';
const ADD_COURSE_MODULE_SUCCESS = 'ADD_COURSE_MODULE_SUCCESS';
const ADD_COURSE_MODULE_ERROR = 'ADD_COURSE_MODULE_ERROR';

const UPDATE_COURSE_MODULE = 'UPDATE_COURSE_MODULE';
const UPDATE_COURSE_MODULE_SUCCESS = 'UPDATE_COURSE_MODULE_SUCCESS';
const UPDATE_COURSE_MODULE_ERROR = 'UPDATE_CORSE_MODULE_ERROR';

const DELETE_COURSE_MODULE = 'COURSE/DELETE_COURSE_MODULE';
const DELETE_COURSE_MODULE_SUCCESS = 'COURSE/DELETE_COURSE_MODULE_SUCCESS';
const DELETE_COURSE_MODULE_ERROR = 'COURSE/DELETE_COURSE_MODULE_ERROR';

const ADD_ACTIVITY_COURSE = 'COUSER/ADD_ACTIVITY';
const ADD_ACTIVITY_COURSE_SUCCESS = 'COURSE/ADD_ACTIVITY_COURSE_SUCCESS';
const ADD_ACTIVITY_COURSE_ERROR = 'COURSE/ADD_ACTIVITY_COURSE_ERROR';

const UPDATE_ACTIVITY_COURSE = 'COURSE/UPDATE_ACTIVITY_COURSE';
const UPDATE_ACTIVITY_COURSE_SUCCESS = 'COURSE/UPDATE_ACTIVITY_COURSE_SUCCESS';
const UPDATE_ACTIVITY_COURSE_ERROR = 'COURSE/UPDATE_ACTIVITY_COURSE_ERROR';

const DELETE_ACTIVITY_COURSE = 'COURSE/DELETE_ACTIVITY_COURSE';
const DELETE_ACTIVITY_COURSE_SUCCESS = 'COURSE/DELETE_ACTIVITY_COURSE_SUCCESS';
const DELETE_ACTIVITY_COURSE_ERROR = 'COURSE/DELETE_ACTIVITY_COURSE_ERROR';


/* Actios Creators */
export const resetCoursesStatus = () => ({ type: RESET_COURSES_SATUS });
export const resetCourseArray = () => ({ type: RESET_COURSES_SATUS });

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
const updateEventCourse = () => ({ type: UPDATE_EVENT_COURSE });
const updateEventCourseSuccess = (courseData) => ({ type: UPDATE_EVENT_COURSE_SUCCESS, payload: courseData });
const updateEventCourseError = (error) => ({ type: UPDATE_EVENT_COURSE_ERROR, payload: error });

// DELETE EVENT COURSE
const deleteEventCourse = () => ({ type: DELETE_EVENT_COURSE });
const deleteEventCourseSuccess = (deletedCourse) => ({ type: DELETE_EVENT_COURSE_SUCCESS, payload: deletedCourse });
const deleteEventCourseError = (error) => ({ type: DELETE_EVENT_COURSE_ERROR, payload: error });

// ADD MODULE COURSE
const addCourseModule = () => ({ type: ADD_COURSE_MODULE });
const addCourseModuleSuccess = (moduleData) => ({type: ADD_COURSE_MODULE_SUCCESS, payload: moduleData });
const addCourseModuleError = (error) => ({ type: ADD_COURSE_MODULE_ERROR, payload: error });

// UPDATE COURSE MODULE
const updateCourseModule = () => ({ type: UPDATE_COURSE_MODULE });
const updateCourseModuleSuccess = (courseData) => ({ type: UPDATE_COURSE_MODULE_SUCCESS, payload: courseData });
const updateCourseModuleError = (error) => ({ type: UPDATE_COURSE_MODULE_ERROR, payload: error });

// DELETE COURSE MODULE
const deleteCourseModule = () => ({ type: DELETE_COURSE_MODULE });
const deleteCourseModuleSuccess = (deletedCourse) => ({ type: DELETE_COURSE_MODULE_SUCCESS, payload: deletedCourse });
const deleteCourseModuleError = (error) => ({ type: DELETE_COURSE_MODULE_ERROR, payload: error });

// ADD COURSE ACTIVITY
const addActivityCourse = () => ({ type: ADD_ACTIVITY_COURSE });
const addActivityCourseSuccess = (activityData) => ({ type: ADD_ACTIVITY_COURSE_SUCCESS, payload: activityData });
const addActivityCourseError = (error) => ({ type: ADD_ACTIVITY_COURSE_ERROR, payload: error });

// UPDATE COURSE ACTIVITY
const updateActivityCourse = () => ({ type: UPDATE_ACTIVITY_COURSE });
const updateActivityCourseSuccess = updatedActivity => ({ type: UPDATE_ACTIVITY_COURSE_SUCCESS, payload: updatedActivity });
const updateActivityCourseError = error => ({ type: UPDATE_ACTIVITY_COURSE_ERROR, payload: error });

// DELETE ACTIVITY COURSE
const deleteActivityCourse = () => ({ type: DELETE_ACTIVITY_COURSE });
const deleteActivityCourseSuccess = deletedActivity => ({ type: DELETE_ACTIVITY_COURSE_SUCCESS, payload: deletedActivity });
const deleteActivityCourseError = error => ({ type: DELETE_ACTIVITY_COURSE_ERROR, payload: error });


/* Thunk */
export const populateEventCoursesAction =  eventId => (dispatch) => {
  dispatch(populateEventCourses());
  return getCoursesForEvent(eventId)
    .then((coursesArray) => {
      dispatch(populateEventCoursesSuccess(coursesArray));
      dispatch({ type: RESET_COURSES_SATUS });
      return coursesArray;
    })
    .catch((error) => {
      const { response = {} } = error;
      const { data = {} } = response;
      useSweet().infoAlert({ text: data.message || 'Los cursos no estan disponibles' });
      dispatch(populateEventCoursesError(data.message || error));
      dispatch({ type: RESET_COURSES_SATUS })
      return error;
    })
}

// Create event course
export const createOrUpdateEventCourseAction = (coursePayload, actionType) => (dispatch) => {
  dispatch(actionType === 'create' ? createEventCourse() : updateEventCourse());
  if (actionType === 'create') return postCourse(coursePayload)
    .then((courseData) => {
      return successAction(
        dispatch, createEventCourseSuccess, courseData, RESET_COURSES_SATUS, 'Curso agregado'
      )
    })
    .catch((error) => {
      return errorAction(
        dispatch, createEventCourseError, error, RESET_COURSES_SATUS, 'No fue posible agregar el curso.'
      );
    })
  if (actionType === 'update') return patchCourse(coursePayload._id, coursePayload)
    .then((updatedCourse) => {
      return successAction(
        dispatch, updateEventCourseSuccess, updatedCourse, RESET_COURSES_SATUS, 'Curso actualizado'
      );
    })
    .catch((error) => {
      return errorAction(
        dispatch, updateEventCourseError, error, RESET_COURSES_SATUS, 'No fue posible actualizar el curso',
      );
    });
}

// DELETE EVENT COURSE
export const deleteEventCourseAction = (courseData) => (dispatch) => {
  dispatch(deleteEventCourse());
  return deleteCourse(courseData._id)
    .then((deletedCourse) => {
      successAction(
        dispatch, deleteEventCourseSuccess, deletedCourse, RESET_COURSES_SATUS, 'Curso eliminado'
      );
      populateEventCoursesAction(courseData.location.addressName)(dispatch);
      return deletedCourse;
    })
    .catch((error) => {
      errorAction(
        dispatch, deleteEventCourseError, error, RESET_COURSES_SATUS, 'Curso eliminado'
      );
      return error;
    });
};

// ADD COURSE MODULE
export const addOrUpdateCourseModuleAction = (moduleData, mainEventId) => (dispatch) => {
  dispatch(moduleData._id ? updateCourseModule() : addCourseModule());
  if (moduleData._id) return patchCourseModule(moduleData._id, moduleData)
    .then((data) => {
      successAction(
        dispatch, updateCourseModuleSuccess, data, RESET_COURSES_SATUS, 'Módulo actualizado',
      )
      return data;
    })
    .catch((error) => {
      return errorAction(
        dispatch, updateCourseModuleError, error, RESET_COURSES_SATUS, 'No fue posible actualizar el módulo',
      );
    });
  return postCourseModule(moduleData)
    .then((createdModule) => {
      successAction(
        dispatch, addCourseModuleSuccess, createdModule, RESET_COURSES_SATUS, 'Módulo agregado',
      );
      populateEventCoursesAction(mainEventId)(dispatch);
      return createdModule;
    })
    .catch((error) => {
      return errorAction(
        dispatch, addCourseModuleError, error, RESET_COURSES_SATUS, 'Error al agregar el módulo'
      );
    });
};

// DELETE COURSE MODULE
export const deleteCourseModuleAction = (module) => (dispatch) => {
  dispatch(deleteCourseModule());
  return deleteCourseForModule(module._id)
    .then((deletedModule) => {
      return successAction(
        dispatch, deleteCourseModuleSuccess, deletedModule, RESET_COURSES_SATUS, 'Módulo eliminado',
      );
    })
    .catch((error) => {
      return errorAction(
        dispatch, deleteCourseModuleError, error, RESET_COURSES_SATUS, 'No fue posible eliminar el módulo',
      );
    });
};

// ADD ACTIVITY COURSE
export const addOrUpdateActivityCourse = (activityData, object) => (dispatch) => {
  dispatch(activityData._id ? updateActivityCourse() : addActivityCourse());
  if (activityData._id) return patchActivityForCourseModule(activityData._id, activityData)
    .then((updatedActivity) => {
      return successAction(
        dispatch, updateActivityCourseSuccess, updatedActivity, RESET_COURSES_SATUS, 'Actividad actualizada',
      );
    })
    .catch((error) => {
      return errorAction(
        dispatch, updateActivityCourseError, error, RESET_COURSES_SATUS, 'Error al actualizar actividad',
      );
    });
  return postActivityForCourseModule(activityData)
    .then((createdActivity) => {
      return successAction(
        dispatch, addActivityCourseSuccess, createdActivity, RESET_COURSES_SATUS, 'Actividad creadea',
      );
    })
    .catch((error) => {
      return errorAction(
        dispatch, addActivityCourseError, error, RESET_COURSES_SATUS, 'No fue posible crear la actividad'
      );
    })
};

// DELETE ACTIVITY MODULE
export const deleteActivityModuleAction = (activity) => (dispatch) => {
  dispatch(deleteActivityCourse());
  return deleteActivityForCourseModule(activity._id)
    .then((deletedActivity) => {
      return successAction(
        dispatch, deleteActivityCourseSuccess, deletedActivity, RESET_COURSES_SATUS, 'Actividad eliminada',
      );
    })
    .catch((error) => {
      return errorAction(
        dispatch, deleteActivityCourseError, error, RESET_COURSES_SATUS, 'No fue posible eliminar la actividad',
      );
    });
};

/* reducer */
export default function reducer(state = courseState, action) {
  switch (action.type) {
    /* RESET */
    case RESET_COURSES_SATUS:
      return { ...state, fetching: false, status: null };
    case RESET_COURSE_ARRAY:
      return { ...state, array: [] };
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
    /* Updated course */
    case UPDATE_EVENT_COURSE:
      return { ...state, fetching: true };
    case UPDATE_EVENT_COURSE_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: state.array.map(c => c._id === action.payload._id ? action.payload : c),
      };
    case UPDATE_EVENT_COURSE_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    /* Delete course */
    case DELETE_EVENT_COURSE:
      return { ...state, fetching: true };
    case DELETE_EVENT_COURSE_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case DELETE_EVENT_COURSE_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    /* ADD COURSE MODULE */
    case ADD_COURSE_MODULE:
      return { ...state, fetching: true };
    case ADD_COURSE_MODULE_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case ADD_COURSE_MODULE_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    /* UPDATE COURSE MODULE */
    case UPDATE_COURSE_MODULE:
      return { ...state, fetching: true };
    case UPDATE_COURSE_MODULE_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case UPDATE_COURSE_MODULE_ERROR:
        return window.thunkErrorGenerator(state, action.payload);
    /* ADD MODULE ACTIVITY */
    case ADD_ACTIVITY_COURSE:
      return { ...state, fetching: true };
    case ADD_ACTIVITY_COURSE_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case ADD_ACTIVITY_COURSE_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    /* UPDATE MODULE ACTIVITY */
    case UPDATE_ACTIVITY_COURSE:
      return { ...state, fetching: true };
    case UPDATE_ACTIVITY_COURSE_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case UPDATE_ACTIVITY_COURSE_ERROR:
      return window.thunkErrorGenerator(state, action.payload);
    default:
      return state;
  }
}