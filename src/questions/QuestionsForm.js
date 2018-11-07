import React from 'react';
import { Paper } from 'material-ui';

import SingleSelect from '../answers/SingleSelect';
import MultipleSelect from '../answers/MultipleSelect';
import ShortAnswer from '../answers/ShortAnswer';
import Question from './Question';
import ActionButtons from './ActionButtons';
import { getQuestions } from '../api/QuestionsService';
import { sendAnswer } from '../api/AnswerService';

class QuestionsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      questions: [],
      isSaved: false,
      isAnswered: false
    };
    this.shortAnswerQuestion = React.createRef();
  }

  componentWillMount() {
    return getQuestions().then(questions => {
      this.setState({ questions });
    });
  }

  handleSaveAnswer = () => {
    const question = this.state.questions[this.state.currentQuestionIndex];
    let answer;

    if (question.type === 'short-answer-question') {
      answer = this.shortAnswerQuestion.current.getAnswer();
    }

    const data = {
      question: question.question,
      answer: answer
    };
    sendAnswer(data);
  };

  changeCurrentQuestionIndex = () => {
    this.setState((prevState) => {
      let currentQuestionIndex = prevState.currentQuestionIndex + 1;

      // TODO remove if last page is implemented
      if (currentQuestionIndex > prevState.questions.length - 1) {
        currentQuestionIndex = 0;
      }

      return { currentQuestionIndex, isAnswered: false };
    });
  };

  changeIsSaved = () => {
    this.setState((prevState) => ({
      isSaved: !prevState.isSaved
    }));
  };

  changeIsAnswered = (isAnswered) => {
    this.setState({ isAnswered });
  };

  renderCorrectAnswerOptions = (question) => {
    switch (question.type) {
      case 'single-select-question':
        return (
          <SingleSelect
            question={question}
            changeIsAnswered={this.changeIsAnswered}
          />
        );
      case 'multiple-select-question':
        return (
          <MultipleSelect
            question={question}
            changeIsAnswered={this.changeIsAnswered}
          />
        );
      case 'short-answer-question':
        return (
          <ShortAnswer
            ref={this.shortAnswerQuestion}
            question={question}
            isAnswered={this.state.isAnswered}
            changeIsAnswered={this.changeIsAnswered}
          />
        );
      default:
        return '';
    }
  };

  renderQuestionAndAnswer = () => {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    if (currentQuestion) {
      return (
        <div style={{ minHeight: '300px' }}>
          <div style={{ textAlign: 'center' }}>
            <Question title={currentQuestion.question} />
          </div>
          {this.renderCorrectAnswerOptions(currentQuestion)}
        </div>
      );
    }
    return '';
  };

  renderActionButtons() {
    if (!this.state.questions[this.state.currentQuestionIndex]) return null;

    return (
      <ActionButtons
        isSaved={this.state.isSaved}
        isAnswered={this.state.isAnswered}
        changeCurrentQuestionIndex={this.changeCurrentQuestionIndex}
        changeIsSaved={this.changeIsSaved}
        changeIsAnswered={this.changeIsAnswered}
        saveAnswer={this.handleSaveAnswer}
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
