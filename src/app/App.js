import React, { Component } from 'react';
import QuestionFormContainer from '../containers/QuestionFormContainer';
import { getQuestions } from '../api/QuestionsService';

class App extends Component {
  render() {
    console.log('getQuestions', getQuestions());
    return (
      <QuestionFormContainer />
    );
  }
}

export default App;
