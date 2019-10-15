import axios from 'axios';
const APIURL = `${process.env.REACT_APP_BASE_API_URL}/residences`;

export const getResidencesForUser = (userId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?query={"user": "${userId}"}`, {
    headers: {
      Authorization: token,
    }
  }).then(({ data }) => data);
};
