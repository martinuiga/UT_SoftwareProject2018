import React from 'react';
import { Paper } from 'material-ui';
import { merge } from 'ramda';

import SingleSelect from '../answers/SingleSelect';
import MultipleSelect from '../answers/MultipleSelect';
import ShortAnswer from '../answers/ShortAnswer';
import Question from './Question';
import { getQuestions } from '../api/QuestionsService';

class QuestionsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentQuestionIndex: 2 };
  }

  componentWillMount() {
    return getQuestions().then(questions => {
      this.setState(prevState => merge(prevState, {
        currentQuestion: questions[1] // Mitmes küsimus võetakse jsonist
      }));
    });
  }

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
        </Paper>
      </div>
    );
  }
}

export default QuestionsForm;
