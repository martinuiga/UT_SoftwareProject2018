import React from 'react';
import Question from './Question';
import AnswerOptions from '../answers/AnswerOptions';

class QuestionForm extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Question />
        <AnswerOptions />
      </div>
    );
  }
}

export default QuestionForm;
