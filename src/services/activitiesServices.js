/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/activities`;
let user 
if(localStorage.user) user = JSON.parse(localStorage.user);
const token = localStorage.authToken;

export const getActivitiesForUser = (userId = user._id) => axios.get(`${APIURL}`,{
  headers: {
    Authorization: token,
  },
}).then(({ data }) => data);

export const createActivity = activityData => axios.post(`${APIURL}`, activityData, {
  headers: {
    Authorization: token,
  },
}).then(({ data }) => data);
