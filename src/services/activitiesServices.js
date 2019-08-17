/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/activities`;
let user 
if(localStorage.user) user = JSON.parse(localStorage.user);
const token = localStorage.authToken;

export const getActivitiesForUser = async (userId) => {
  const selfUser = await JSON.parse(localStorage.getItem('user'));
  const authToken = await localStorage.getItem('authToken');

  return axios.get(`${APIURL}?query={"user": "${userId || selfUser._id}"}`, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};

export const createActivity = async (activityData) => {
  const authToken = await localStorage.getItem('authToken');

  return axios.post(`${APIURL}`, activityData, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};
