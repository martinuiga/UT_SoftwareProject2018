import axios from 'axios';

const QuestionsService = () => {
  const URL = 'https://blog.kmu.ee/wp-json/wp/v2/questions';
  const API = axios.get(URL)
    .then((response) => console.log('RESPONSE', response));
  return null;
};

export default QuestionsService;
