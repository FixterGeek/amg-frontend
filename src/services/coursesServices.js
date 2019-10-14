import axios from 'axios';
import { transformToFormData } from '../components/admin/events/tools';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/events`;


export const getCoursesForEvent = (eventId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?query={"location.addressName":"${eventId}"}`, {
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


export const patchCourse = (courseId, courseData) => {
  const token = localStorage.authToken;
  const form = new FormData();
  delete courseData._id;
  delete courseData.assistants;
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
