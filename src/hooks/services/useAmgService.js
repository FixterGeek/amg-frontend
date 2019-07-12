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

  const signup = async (
    name,
    dadSurname,
    momSurname,
    email,
    password,
    birthDate,
    placeOfBirth,
    speciality,
    userStatus
  ) =>
    axios.post(
      `${baseAuthURL}/signup`,
      {
        name,
        dadSurname,
        momSurname,
        email,
        password,
        birthDate,
        placeOfBirth,
        speciality,
        userStatus
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  const getEvents = async () => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${APIURL}events/`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  const getSingleEvent = async id => {
    const authToken = await localStorage.getItem("authToken");
    return axios.get(`${APIURL}events/${id}`, {
      headers: {
        Authorization: authToken
      }
    });
  };

  return {
    login,
    logout,
    signup,
    getEvents,
    getSingleEvent
  };
}

export default useAmgService;
