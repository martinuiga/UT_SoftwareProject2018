import axios from 'axios';


export const structurizeAnswers = (APIresponseData) => {
  const answers = [];
  APIresponseData.forEach(question => {
    const answerObject = {
      question: question.term_question,
      answer: question.term_answer
    };
    answers.push(answerObject);
  });
  return answers;
};

export const getAnswers = () => {
  const URL = 'https://blog.kmu.ee/wp-json/db-json/questions';

  return axios.get(URL)
    .then((response) => {
      return structurizeAnswers(response.data);
    })
    .catch(err => console.log(err));
};

export const sendAnswer = (answer) => {
  const URL = 'https://blog.kmu.ee/wp-json/db/addquestion';

  return axios.post(URL, answer)
    .catch(err => console.log(err));
};
