import React, { Component } from 'react';
import QuestionFormContainer from '../containers/QuestionFormContainer';
import { getQuestions } from '../api/QuestionsService';

class App extends Component {
  render() {
    return (
      <div>
        <QuestionFormContainer />
        {getQuestions()}
      </div>
    );
  }
}

export default App;
