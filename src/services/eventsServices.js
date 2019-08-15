import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/events`;

export const getEvents = async () =>{
  const token = localStorage.authToken;

  return axios.get(`${APIURL}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const getSingleEvent = (id) => {
  const token = localStorage.authToken;

  return axios.get(`${APIURL}/${id}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const assistAnEvent = (eventId) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return axios.post(`${APIURL}/${eventId}/assist`, null, {
    headers: {
      Authorization: user.token,
    },
  }).then(({ data }) => data);
};
