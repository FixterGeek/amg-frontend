import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/studies`;
const token = JSON.parse(localStorage.authToken);

export const getStudies = () => axios.get(`${APIURL}`, { headers: { Authorization: token } }).then(({ data }) => data);

export const createStudie = async (studieData) => {
  const user = await JSON.parse(localStorage.getItem('user'));
  return axios.post(`${APIURL}`, { ...studieData, user: user._id }, {
    headers: {
      Authorization: user.token,
    },
  })
    .then(({ data }) => data);
};
