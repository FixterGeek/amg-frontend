import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/events`;
const authToken = localStorage.getItem('authToken');

export const getEvents = () => axios.get(`${APIURL}`, {
  headers: {
    Authorization: authToken,
  },
}).then(({ data }) => data);


export const getSingleEvent = id => axios.get(`${APIURL}/${id}`, {
  headers: {
    Authorization: authToken,
  },
}).then(({ data }) => data);


export const assistAnEvent = eventId => axios.post(`${APIURL}/${eventId}/assist`, null, {
  headers: {
    Authorization: authToken,
  },
}).then(({ data }) => data);
