import axios from 'axios'

const APIURL = process.env.REACT_APP_BASE_API_URL;
const authToken = localStorage.getItem('authToken');

export const usersService = {
    getAllUsers:(query='')=>{               
        return axios.get(
            `${APIURL}/users${query}`,
            {
                headers: {
                    'Authorization': authToken,
                },
            }
        ).then(response=>response.data)
        .catch(error=>error)
    },
}