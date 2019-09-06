/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}`;
const STUDIES_API = `${APIURL}/studies`;


export const createEducation = async (type, educationData) => {
  const url = `${APIURL}/${type}`;
  const authToken = await localStorage.getItem('authToken');
  return axios.post(url, educationData, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => {
    // eslint-disable-next-line no-param-reassign
    data.educationType = type;
    return data;
  });
};

export const getStudiesForUser = async (userId) => {
  const selfUser = await JSON.parse(localStorage.getItem('user'));
  const authToken = await localStorage.getItem('authToken');

  return axios.get(`${STUDIES_API}?query={"user": "${userId || selfUser._id}"}`, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};
