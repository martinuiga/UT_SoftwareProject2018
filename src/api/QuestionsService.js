import axios from 'axios';

const structurizeQuestions = (APIresponseData) => {
  const questions = [];
  APIresponseData.forEach(question => {
    const questionObject = {
      question: question.title.rendered,
      type: question.slug
    };
    let answerChoices;
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
    questions.push(questionObject);
  });
  console.log('QUESTIONS STRUCTURIZED', questions);
  return questions;
};

export const getQuestions = () => {
  const URL = 'https://blog.kmu.ee/wp-json/wp/v2/questions';


  return axios.get(URL)
    .then((response) => {
      console.log('response.data', response.data);
      return structurizeQuestions(response.data);
    })
    .catch(err => console.log(err));
};
