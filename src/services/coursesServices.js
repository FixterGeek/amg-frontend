import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/courses`;


export const getCoursesForEvent = (eventId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?filter={"event":"${eventId}"}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const postCourse = (courseData) => {
  const token = localStorage.authToken;
  return axios.post(APIURL, courseData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const patchCourse = (courseId, courseData) => {
  const token = localStorage.authToken;
  return axios.patch(`${APIURL}/${courseId}`, courseData, {
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
