import Axios from 'axios';

export const sendAnswer = (answer) => {
  console.log('answer to be sent', answer);
  const URL = 'https://blog.kmu.ee/wp-json/db/addquestion';

  return Axios.post(URL, answer)
    .catch(err => console.log(err));
};
