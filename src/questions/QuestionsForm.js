import React from 'react';
import Question from './Question';
import AnswerOptions from '../answers/AnswerOptions';

class QuestionsForm extends React.Component {
  // Siia tuleb loogika, mis võtab ühe välja kuvatava küsimuse
  // ja vastavalt tüübile renderdatakse õiged komponendid
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

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Question />
        {this.renderCorrectAnswerOptions()}
        {/* Siin tuleb välja vaadata, millise küsimusega on tegemist
        ja AnswersOptions asemele teha mingi case'ide lugu, mis renderdab õige komponendi */}
        <AnswerOptions />
      </div>
    );
  }
}

export default QuestionsForm;
