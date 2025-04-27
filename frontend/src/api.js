import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password });
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error registering user');
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error logging in');
  }
};

export const getTasks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error fetching tasks');
  }
};

export const createTask = async (task, token) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error creating task');
  }
};

export const updateTask = async (id, task, token) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error updating task');
  }
};

export const deleteTask = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error deleting task');
  }
};