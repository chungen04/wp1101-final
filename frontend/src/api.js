import axios from 'axios';

const url = new URL("/", window.location.href);

const instance = axios.create({
  baseURL:  url.href,
});

export default instance;