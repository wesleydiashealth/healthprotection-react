import axios from 'axios';

const hpbApi = axios.create({
  baseURL: 'https://hpb.healthprotection.com/',
});

export default hpbApi;
