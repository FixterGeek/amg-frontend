/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}`;
const token = localStorage.authToken;


export const createEducation = (type, educationData) => {
  const url = `${APIURL}/${type}`;
  return axios.post(url, educationData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => {
    // eslint-disable-next-line no-param-reassign
    data.educationType = type;
    return data;
  });
};
