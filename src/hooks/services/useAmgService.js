// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";

function useAmgService() {
  const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;
  const APIURL = process.env.REACT_APP_BASE_API_URL;

  const login = async (email, password) =>
    axios.post(
      `${baseAuthURL}/login`,
      {
        email,
        password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  const logout = async history => {
    await localStorage.removeItem("authToken");
    history.push("/login");
  };

  const signup = async (name, email, password) =>
    axios.post(`${baseAuthURL}/signup`, {
      name,
      email,
      password
    });

  const getEvents = async () => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}events/`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  const getSingleEvent = async (id) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}events/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  return {
    login,
    logout,
<<<<<<< HEAD
    signup
=======
    signup,
    getEvents,
    getSingleEvent,
>>>>>>> 0f78973cc73a04130d9bd1d5345dfed08893aeef
  };
}

export default useAmgService;
