import axios from 'axios';

const opponoApi = axios.create({
  baseURL: 'https://oppono-app.com/wp-json/oppono/v1',
  timeout: 0,
});
export default opponoApi;