import React from 'react';
import { Paper } from 'material-ui';

import SingleSelect from '../answers/SingleSelect';
import MultipleSelect from '../answers/MultipleSelect';
import ShortAnswer from '../answers/ShortAnswer';
import Question from './Question';
import ActionButtons from './ActionButtons';
import { getQuestions } from '../api/QuestionsService';

class QuestionsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      questions: []
    };
  }

  componentWillMount() {
    return getQuestions().then(questions => {
      this.setState({ questions });
    });
  }

  changeCurrentQuestionIndex = () => {
    this.setState((prevState) => {
      let currentQuestionIndex = prevState.currentQuestionIndex + 1;

      // TODO remove if last page is implemented
      if (currentQuestionIndex > prevState.questions.length - 1) {
        currentQuestionIndex = 0;
      }

      return { currentQuestionIndex };
    });
  };

  renderCorrectAnswerOptions = (question) => {
    switch (question.type) {
      case 'single-select-question':
        return (
          <SingleSelect
            question={question}
          />
        );
      case 'multiple-select-question':

        return (
          <MultipleSelect
            question={question}
          />
        );
      case 'short-answer-question':
        return (
          <ShortAnswer
            question={question}
          />
        );
      default:
        return '';
    }
  }

  renderQuestionAndAnswer = () => {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    if (currentQuestion) {
      return (
        <div style={{ textAlign: 'center', minHeight: '260px' }}>
          <Question title={currentQuestion.question} />
          {this.renderCorrectAnswerOptions(currentQuestion)}
        </div>
      );
    }
    return '';
  }

  renderActionButtons() {
    if (!this.state.questions[this.state.currentQuestionIndex]) return null;

    return (
      <ActionButtons
        changeCurrentQuestionIndex={this.changeCurrentQuestionIndex}
      />
    );
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper style={{
          height: 400,
          width: 600,
          margin: 20,
          textAlign: 'center'
        }}
        >
          {this.renderQuestionAndAnswer()}
          {this.renderActionButtons()}
        </Paper>
      </div>
    );
  }
}

export default QuestionsForm;
