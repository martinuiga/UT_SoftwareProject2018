import React from 'react';
import { find, propEq, pluck, isEmpty, clone, contains, merge } from 'ramda';
import { Paper, Subheader } from 'material-ui';

import SingleSelect from '../answers/SingleSelect';
import MultipleSelect from '../answers/MultipleSelect';
import ShortAnswer from '../answers/ShortAnswer';
import Question from './Question';
import ActionButtons from './ActionButtons';
import { getQuestions } from '../api/QuestionsService';
import { sendAnswer, getAnswers } from '../api/AnswerService';
import ShortAnswerQuestionAnswers from '../answers/previous/ShortAnswerQuestionAnswers';
import { getCurseWords } from '../file/FileReader';
import CurseModal from '../modals/CurseModal';
import MultipleSelectAnswers from '../answers/previous/MultipleSingleSelectAnswers';
import FinalPage from './FinalPage';
import WelcomePage from './WelcomePage';

const getRandomIndex = (answers) => {
  return Math.floor(Math.random() * answers.length);
};

class QuestionsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: -1,
      questions: [],
      answers: [],
      isSaved: false,
      isAnswered: false,
      showPreviousAnswers: false,
      curseModalOpen: false,
      finalPageVisible: false
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
      this.shortAnswerQuestion.current.clearAnswer();
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

  containsCurseWords = () => {
    if (this.shortAnswerQuestion.current) {
      const answer = this.shortAnswerQuestion.current.getAnswer().toLowerCase();
      const words = answer.split(' ');
      const wordsWithoutPunctuation = words.map(word => word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ''));
      const curseWords = getCurseWords();
      const containsCurses = wordsWithoutPunctuation.some(word => contains(word, curseWords));
      return containsCurses;
    }
    return false;
  };

  changeCurrentQuestionIndex = () => {
    this.setState((prevState) => {
      let currentQuestionIndex = prevState.currentQuestionIndex + 1;
      let showPreviousAnswers = false;
      let finalPageVisible = false;

      // If finalPage button clicked then start with welcome page and hide final page
      if (prevState.finalPageVisible === true) {
        currentQuestionIndex = -1;
        finalPageVisible = false;
      }

      // If all questions have been answered then set final page visible
      if (currentQuestionIndex > prevState.questions.length - 1) {
        finalPageVisible = true;
      }
      if (currentQuestionIndex >= 0 && currentQuestionIndex <= prevState.questions.length - 1) {
        const question = prevState.questions[currentQuestionIndex];
        if (question.type === 'short-answer-question') {
          showPreviousAnswers = true;
        }
      }
      return {
        currentQuestionIndex,
        isAnswered: false,
        isSaved: false,
        showPreviousAnswers: showPreviousAnswers,
        finalPageVisible
      };
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

  changeShowPreviousAnswers = (isShow) => {
    this.setState({ showPreviousAnswers: isShow });
  };

  toggleCurseModal = () => {
    this.setState(prevState => merge(prevState,
      { curseModalOpen: !prevState.curseModalOpen }));
  }

  renderCorrectAnswerOptions = (question) => {
    switch (question.type) {
      case 'single-select-question':
        return (
          <SingleSelect
            ref={this.singleSelectQuestion}
            question={question}
            showAnswers={this.state.showPreviousAnswers}
            changeIsAnswered={this.changeIsAnswered}
          />
        );
      case 'multiple-select-question':
        return (
          <MultipleSelect
            ref={this.multipleSelectQuestion}
            question={question}
            showAnswers={this.state.showPreviousAnswers}
            changeIsAnswered={this.changeIsAnswered}
          />
        );
      case 'short-answer-question':
        return (
          <ShortAnswer
            ref={this.shortAnswerQuestion}
            question={question}
            isAnswered={this.state.isAnswered}
            disabled={this.state.isSaved}
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
            <MultipleSelectAnswers answers={answers} />
          );
        case 'multiple-select-question':
          return (
            <MultipleSelectAnswers answers={answers} />
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
    return <Subheader>Kahjuks on veel liiga vähe andmeid, et statistikat kuvada.</Subheader>;
  };

  renderQuestionAndAnswer = () => {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    if (currentQuestion) {
      return (
        <div style={{ marginBottom: '20px' }}>
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
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <ActionButtons
        isSaved={this.state.isSaved}
        isAnswered={this.state.isAnswered}
        showPreviousAnswers={this.state.showPreviousAnswers}
        isShortAnswerQuestion={currentQuestion.type === 'short-answer-question'}
        changeCurrentQuestionIndex={this.changeCurrentQuestionIndex}
        changeIsSaved={this.changeIsSaved}
        changeIsAnswered={this.changeIsAnswered}
        changeShowPreviousAnswers={this.changeShowPreviousAnswers}
        containsCurseWords={this.containsCurseWords}
        toggleCurseModal={this.toggleCurseModal}
        saveAnswer={this.handleSaveAnswer}
      />
    );
  }

  renderCurseModal() {
    if (this.state.curseModalOpen) {
      return (
        <CurseModal
          modalOpen={this.state.curseModalOpen}
          toggleCurseModal={this.toggleCurseModal}
          changeIsAnswered={this.changeIsAnswered}
        />
      );
    }
    return '';
  }

  renderFinalPage() {
    return (
      <FinalPage
        answerAgain={this.changeCurrentQuestionIndex}
      />
    );
  }

  renderWelcomePageOrQuestions() {
    if (this.state.currentQuestionIndex === -1) {
      return (
        <WelcomePage
          startAnswering={this.changeCurrentQuestionIndex}
        />
      );
    }
    return (
      <React.Fragment>
        {this.renderQuestionAndAnswer()}
        {this.renderActionButtons()}
        {this.state.showPreviousAnswers ? this.renderAnswers() : ''}
        {this.renderCurseModal()}
      </React.Fragment>
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
          overFlow: 'auto',
          display: 'table'
        }}
        >
          {this.state.finalPageVisible
            ? (this.renderFinalPage())
            : (this.renderWelcomePageOrQuestions())
          }
        </Paper>
      </div>
    );
  }
}

export default QuestionsForm;
