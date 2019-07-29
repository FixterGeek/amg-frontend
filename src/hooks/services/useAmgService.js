// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';

function useAmgService() {
  const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;
  const APIURL = process.env.REACT_APP_BASE_API_URL;

  const login = async (email, password) => axios.post(
    `${baseAuthURL}/login`, { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const logout = async (history) => {
    await localStorage.removeItem('authToken');
    history.push('/login');
  };

  const signup = async (name, email, password) => axios.post(`${baseAuthURL}/signup`, {
    name,
    email,
    password,
  });

  const getSelfUser = async () => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${baseAuthURL}/self`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  /* Events section */

  const getEvents = async () => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}/events/`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  const getSingleEvent = async (id) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}/events/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  const assistAnEvent = async (eventId) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.post(`${APIURL}/events/${eventId}/assist`, null, {
      headers: {
        Authorization: authToken,
      },
    });
  };


  /* Activities section */

  const getActivitiesForEvent = async (eventId) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}/eventActivities?query={"event": "${eventId}"}`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  const getSingleActivity = async (activityId) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}/aventActivities/${activityId}`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  const getActivitiesForUser = async (userId) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}/eventActivities?query={"assistants":{"$in":["${userId}"]}}`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  const activitySubscribe = async (eventId) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.post(`${APIURL}/eventActivities/${eventId}/assist`, null, {
      headers: {
        Authorization: authToken,
      },
    });
  };


  /* Publications section */

  const getPublications = async () => {
    const authToken = await localStorage.getItem('authToken');
    return axios.get(`${APIURL}/publications/`, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  const toPublish = async (data, headers) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.post(`${APIURL}/publications`, data, {
      headers: {
        Authorization: authToken,
        ...headers,
      },
    });
  };

  const addToFav = async (postId) => {
    const authToken = await localStorage.getItem('authToken');
    return axios.post(`${APIURL}/publications/${postId}/like`, null, {
      headers: {
        Authorization: authToken,
      },
    });
  };

  return {
    login,
    logout,
    signup,
    getSelfUser,
    getEvents,
    getSingleEvent,
    assistAnEvent,
    getActivitiesForEvent,
    getSingleActivity,
    getActivitiesForUser,
    activitySubscribe,
    getPublications,
    toPublish,
    addToFav,
  };
}

export default useAmgService;
