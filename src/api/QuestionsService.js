import axios from 'axios';
import { merge } from 'ramda';
import he from 'he';

const getQuestionType = (acf) => {
  if (acf.is_multiple_select) {
    return 'multiple-select-question';
  }
  if (acf.is_short_answer) {
    return 'short-answer-question';
  }
  if (acf.is_single_select) {
    return 'single-select-question';
  }
  return '';
};

export const structurizeQuestions = (APIresponseData) => {
  const questions = [];
  APIresponseData.forEach(question => {
    const questionObject = {
      question: he.decode(question.title.rendered),
      type: getQuestionType(question.acf)
    };
    let answerChoices = [];
    switch (questionObject.type) {
      case 'single-select-question':
        answerChoices = he.decode(question.acf.single_select_choices).split(';');
        break;
      case 'multiple-select-question':
        answerChoices = he.decode(question.acf.multiple_select_choices).split(';');
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
  const URL = 'http://terminoloogia.ee/wp-json/wp/v2/questions';

  return axios.get(URL)
    .then((response) => {
      return structurizeQuestions(response.data);
    })
    .catch(err => console.log(err));
};
