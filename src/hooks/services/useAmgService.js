// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';

function useAmgService() {
  const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;

  const login = async (email, password) => axios.post(`${baseAuthURL}/login`, {
    email,
    password,
  });

  const logout = async (history) => {
    await localStorage.removeItem('authToken');
    history.push('/login');
  };

  const signup = async (email, password) => axios.post(`${baseAuthURL}/signup`, {
    email,
    password,
  });

  return {
    login,
    logout,
    signup,
  };
}

export default useAmgService;
