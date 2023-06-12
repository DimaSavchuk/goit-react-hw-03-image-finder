import axios from 'axios';

const API_KEY = '35763619-b9c9e6bf9f3dd81a59d81ea43';
axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  return await axios.get(`?q=${query}&page=${page}&key=${API_KEY}`);
};
