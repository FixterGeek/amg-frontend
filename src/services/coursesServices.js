import axios from 'axios';
import { transformToFormData } from '../components/admin/events/tools';

const BASEAPI = process.env.REACT_APP_BASE_API_URL;
const APIURL = `${process.env.REACT_APP_BASE_API_URL}/courses`;


export const getCoursesForEvent = (eventId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?query={"event":"${eventId}"}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const postCourse = (courseData) => {
  const token = localStorage.authToken;
  const form = new FormData();
  const data = transformToFormData(form, courseData);
  return axios.post(APIURL, data, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  }).then(({ data }) => data);
};


export const patchCourse = (courseId, courseData, isAdmin = true) => {
  const token = localStorage.authToken;
  const form = new FormData();
  if (isAdmin) {
    delete courseData._id;
    delete courseData.students;
  }
  if (courseData.modules && courseData.modules.length === 0) delete courseData.modules;
  const data = transformToFormData(form, courseData);
  return axios.patch(`${APIURL}/${courseId}`, data, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}


export const deleteCourse = (courseId) => {
  const token = localStorage.authToken;
  return axios.delete(`${APIURL}/${courseId}`, {
    headers: {
      Authorization: token,
    }
  }).then(({ data }) => data);
}

export const getSingleCourse = (courseId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}/${courseId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}


export const enrollCourse = (courseId) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/${courseId}/enroll`, null, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}


/* For modules */
export const postCourseModule = (moduleData) => {
  const token = localStorage.authToken;
  return axios.post(`${BASEAPI}/courseModules`, moduleData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}

export const patchCourseModule = (moduleId, moduleData) => {
  const token = localStorage.authToken;
  return axios.patch(`${BASEAPI}/courseModules/${moduleId}`, moduleData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};

export const deleteCourseForModule = (moduleId) => {
  const token = localStorage.authToken;
  return axios.delete(`${BASEAPI}/courseModules/${moduleId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


/* For activities */
export const postActivityForCourseModule = (activityData) => {
  const token = localStorage.authToken;
  delete activityData._id;
  return axios.post(`${BASEAPI}/courseActivities`, activityData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};

export const patchActivityForCourseModule = (activityId, activityData) => {
  const token = localStorage.authToken;
  if (activityData._id) delete activityData._id;
  return axios.patch(`${BASEAPI}/courseActivities/${activityId}`, activityData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};

export const deleteActivityForCourseModule = (activityId) => {
  const token = localStorage.authToken;
  return axios.delete(`${BASEAPI}/courseActivities/${activityId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};
