// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";

function useAmgService() {
  const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;
  const APIURL = process.env.REACT_APP_BASE_API_URL;
  const baseUserURL = process.env.REACT_APP_BASE_USER_URL;
  const baseAdminURL = process.env.REACT_APP_BASE_ADMIN_URL

  const login = async (email, password) =>
    axios.post(
      `${baseAuthURL}/login`,
      { email, password },
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

  /* signup flow */

  const signup = async (name, email, password) =>
    axios.post(`${baseAuthURL}/signup`, {
      name,
      email,
      password
    });

  const getSelfUser = async () => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${baseAuthURL}/self`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  /* User section */

  const getUser = async id => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${baseUserURL}/${id}`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  const editUser = async id => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${baseUserURL}/${id}/edit`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  const getUsers = async () => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${baseUserURL}`, {
      header: {
        Authorization: authToken
      }
    });
  };

  /* Events section */

  const getEvents = async () => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${APIURL}/events/`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  const getSingleEvent = async id => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${APIURL}/events/${id}`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  /* Publications section */

  const getPublications = async () => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${APIURL}/publications/`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  const toPublish = async (data, headers) => {
    const authToken = await localStorage.getItem("authToken");
    return axios.post(`${APIURL}/publications`, data, {
      headers: {
        Authorization: authToken,
        ...headers
      }
    });
  };

  const addToFav = async postId => {
    const authToken = await localStorage.getItem("authToken");
    return axios.post(`${APIURL}/publications/${postId}/like`, null, {
      headers: {
        Authorization: authToken
      }
    });
  };

  return {
    login,
    logout,
    signup,
    getSelfUser,
    getUser,
    editUser,
    getUsers,
    getEvents,
    getSingleEvent,
    getPublications,
    toPublish,
    addToFav
  };
}

export default useAmgService;
