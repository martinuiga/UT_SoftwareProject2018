import axios from 'axios';
import { merge } from 'ramda';

const structurizeQuestions = (APIresponseData) => {
  const questions = [];
  APIresponseData.forEach(question => {
    const questionObject = {
      question: question.title.rendered,
      type: question.slug
    };
    let answerChoices = [];
    switch (questionObject.type) {
      case 'single-select-question':
        answerChoices = question.acf.single_select_choices.split(';');
        break;
      case 'multiple-select-question':
        answerChoices = question.acf.multiple_select_choices.split(';');
        break;
      default:
        break;
    }
    const finalQuestionObject = merge(questionObject, { answerChoices: answerChoices });
    questions.push(finalQuestionObject);
  });
  return questions;
};

export const getQuestions = () => {
  const URL = 'https://blog.kmu.ee/wp-json/wp/v2/questions';

  return axios.get(URL)
    .then((response) => {
      return structurizeQuestions(response.data);
    })
    .catch(err => console.log(err));
};
