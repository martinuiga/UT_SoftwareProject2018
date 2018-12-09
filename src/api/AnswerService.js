import axios from 'axios';


export const structurizeAnswers = (APIresponseData) => {
  const answers = [];
  APIresponseData.forEach(question => {
    // TODO add question type
    const answerObject = {
      question: question.term_question,
      answer: question.term_answer
    };
    answers.push(answerObject);
  });
  return answers;
};

export const getAnswers = () => {
  const URL = 'http://terminoloogia.ee/wp-json/db-json/questions';

  return axios.get(URL)
    .then((response) => {
      return structurizeAnswers(response.data);
    })
    .catch(err => console.log(err));
};

export const sendAnswer = (answer) => {
  const URL = 'http://terminoloogia.ee/wp-json/db-json/addquestion';

  return axios.post(URL, answer)
    .catch(err => console.log(err));
};
