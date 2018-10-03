import React from 'react';
import Question from './Question';
import AnswerOptions from '../answers/AnswerOptions';

class QuestionForm extends React.Component {
  // Siia tuleb loogika, mis võtab ühe välja kuvatava küsimuse
  // ja vastavalt tüübile renderdatakse õiged komponendid
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Question />
        {/* Siin tuleb välja vaadata, millise küsimusega on tegemist
        ja AnswersOptions asemele teha mingi case'ide lugu, mis renderdab õige komponendi */}
        <AnswerOptions />
      </div>
    );
  }
}

export default QuestionForm;
