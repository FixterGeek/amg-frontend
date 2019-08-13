import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/events`;
const user = JSON.parse(localStorage.getItem('user'));

export const getEvents = () => axios.get(`${APIURL}`, {
  headers: {
    Authorization: user.token,
  },
}).then(({ data }) => data);


export const getSingleEvent = id => axios.get(`${APIURL}/${id}`, {
  headers: {
    Authorization: user.token,
  },
}).then(({ data }) => data);


export const assistAnEvent = eventId => axios.post(`${APIURL}/${eventId}/assist`, null, {
  headers: {
    Authorization: user.token,
  },
}).then(({ data }) => data);
