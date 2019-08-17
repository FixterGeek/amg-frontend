/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}`;


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
