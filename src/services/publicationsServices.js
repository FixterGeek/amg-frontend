import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/publications`;

export const getSelfPublications = async () => {
  const user = await JSON.parse(localStorage.getItem('user'));

  return axios.get(`${APIURL}?query={"user": "${user._id}"}`, {
    headers: {
      Authorization: user.token,
    }
  })
    .then(({ data }) => data);
}
