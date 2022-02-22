import axios from 'axios';

const wordpressApi = axios.create({
  baseURL: 'https://www.healthprotection.com/',
  headers: {
    Authorization:
      'Basic aGVhbHRoLXByb3RlY3Rpb246VHZWMyBrbDhqIE1wY2cgVk5zcSA4OHZLIDNCQlg=',
  },
});

export default wordpressApi;
