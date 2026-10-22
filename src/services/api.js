import axios from 'axios';

// All remote requests go through one configured Axios client, as required by the lab spec.
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
});

export default apiClient;
