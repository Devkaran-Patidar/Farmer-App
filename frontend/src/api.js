// Mock backend API calls
// const API_URL = "http://localhost:8000/"; 

// src/api.js
import axios from 'axios';
import { API_KEY, API_URL } from './config';

// Create a global axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`, // automatically include API key
  },
});

export default api;
