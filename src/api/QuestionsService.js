import axios from 'axios';

export const getQuestions = () => {
  const URL = 'https://blog.kmu.ee/wp-json/wp/v2/questions';

  return axios.get(URL)
    .then((response) => {
      // console.log('response.data', response.data);
      return response.data;
    })
    .catch(err => console.log(err));
};
