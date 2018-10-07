import React from 'react';
import { merge } from 'ramda';

import SingleSelect from '../answers/SingleSelect';
import MultipleSelect from '../answers/MultipleSelect';
import ShortAnswer from '../answers/ShortAnswer';
import Question from './Question';
import { getQuestions } from '../api/QuestionsService';

class QuestionsForm extends React.PureComponent {
  constructor(props) {
    super();
    this.state = { currentQuestionIndex: 0 };
  }

  componentWillMount() {
    return getQuestions().then(questions => {
      this.setState(prevState => merge(prevState, {
        currentQuestion: questions[0]
      }));
    });
  }

  renderCorrectAnswerOptions = (question) => {
    switch (question.type) {
      case 'single-select-question':
        return '';
      /* return (
        <SingleSelect
          question={question}
        />
      ); */
      case 'multiple-select-question':
        return '';
      /* return (
        <MultipleSelect
          question={question}
        />
      ); */
      case 'short-answer-question':
        return '';
      /* return (
        <ShortAnswer
          question={question}
        />
      ); */
      default:
        return '';
    }
  }

  renderQuestionAndAnswer = () => {
    if (this.state.currentQuestion) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Question title={this.state.currentQuestion.question} />
          {this.renderCorrectAnswerOptions(this.state.currentQuestion)}
        </div>
      );
    }
    return '';
  }

  render() {
    return this.renderQuestionAndAnswer();
  }
}

export default QuestionsForm;
