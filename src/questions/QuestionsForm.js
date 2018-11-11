import React from 'react';
import { find, propEq, pluck, isEmpty, clone } from 'ramda';
import { Paper } from 'material-ui';

import SingleSelect from '../answers/SingleSelect';
import MultipleSelect from '../answers/MultipleSelect';
import ShortAnswer from '../answers/ShortAnswer';
import Question from './Question';
import ActionButtons from './ActionButtons';
import { getQuestions } from '../api/QuestionsService';
import { sendAnswer, getAnswers } from '../api/AnswerService';
import ShortAnswerQuestionAnswers from '../answers/previous/ShortAnswerQuestionAnswers';

const getRandomIndex = (answers) => {
  return Math.floor(Math.random() * answers.length);
};

class QuestionsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      questions: [],
      answers: [],
      isSaved: false,
      isAnswered: false
    };
    this.randomIndexes = [];
    this.shortAnswerQuestion = React.createRef();
    this.singleSelectQuestion = React.createRef();
    this.multipleSelectQuestion = React.createRef();
  }

  componentWillMount() {
    return getQuestions()
      .then((questions) => {
        return getAnswers()
          .then((answers) => {
            this.setState({ questions, answers });
          });
      });
  }

  setRandomIndexes = (answers) => {
    const answersArray = clone(answers);
    for (let i = 0; i < 4; i++) {
      const randomIndex = getRandomIndex(answersArray);
      this.randomIndexes.push(randomIndex);
      answersArray.splice(randomIndex, 1);
    }
  };

  composeDataAndSendAnswer = (question, answer) => {
    const data = {
      question: question,
      answer: answer
    };
    sendAnswer(data);
  };

  handleSaveAnswer = () => {
    const question = this.state.questions[this.state.currentQuestionIndex];
    let answer;

    if (question.type === 'short-answer-question') {
      answer = this.shortAnswerQuestion.current.getAnswer();
    } else if (question.type === 'single-select-question') {
      answer = this.singleSelectQuestion.current.getAnswer();
    } else if (question.type === 'multiple-select-question') {
      const answers = this.multipleSelectQuestion.current.getAnswers();

      answers.forEach((asw) => {
        this.composeDataAndSendAnswer(question.question, asw);
      });
      return;
    } else {
      throw new Error('Invalid question type');
    }
    this.composeDataAndSendAnswer(question.question, answer);
  };

  changeCurrentQuestionIndex = () => {
    this.setState((prevState) => {
      let currentQuestionIndex = prevState.currentQuestionIndex + 1;

      // TODO remove if last page is implemented
      if (currentQuestionIndex > prevState.questions.length - 1) {
        currentQuestionIndex = 0;
      }

      return { currentQuestionIndex, isAnswered: false, isSaved: false };
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
            ref={this.singleSelectQuestion}
            question={question}
            changeIsAnswered={this.changeIsAnswered}
          />
        );
      case 'multiple-select-question':
        return (
          <MultipleSelect
            ref={this.multipleSelectQuestion}
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

  renderPreviousAnswers = (question) => {
    // TODO remove if question type is added to answers data
    const questionType = find(propEq('question', question.question))(this.state.questions).type;
    const answerObjects = this.state.answers.filter((answer) => answer.question === question.question);
    const answers = pluck('answer', answerObjects);

    if (!isEmpty(answers)) {
      switch (questionType) {
        case 'single-select-question':
          return (
            // <SingleSelectAnswers answers={answers} />
            null
          );
        case 'multiple-select-question':
          return (
            // <MultipleSelectAnswers answers={answers} />
            null
          );
        case 'short-answer-question': {
          if (isEmpty(this.randomIndexes)) {
            this.setRandomIndexes(answers);
          }
          return (
            <ShortAnswerQuestionAnswers
              answers={answers}
              randomIndexes={this.randomIndexes}
            />
          );
        }
        default:
          return '';
      }
    }
    return null;
  };

  renderQuestionAndAnswer = () => {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    if (currentQuestion) {
      return (
        <div style={{ minHeight: '270px' }}>
          <div style={{ textAlign: 'center' }}>
            <Question title={currentQuestion.question} />
          </div>
          {this.renderCorrectAnswerOptions(currentQuestion)}
        </div>
      );
    }
    return '';
  };

  renderAnswers = () => {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    if (currentQuestion) {
      return (
        this.renderPreviousAnswers(currentQuestion)
      );
    }
    return '';
  }

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
          minHeight: 400,
          maxHeight: 700,
          width: 600,
          margin: 20,
          textAlign: 'center',
          overFlow: 'auto'
        }}
        >
          {this.renderQuestionAndAnswer()}
          {this.renderActionButtons()}
          {this.renderAnswers()}
        </Paper>
      </div>
    );
  }
}

export default QuestionsForm;
