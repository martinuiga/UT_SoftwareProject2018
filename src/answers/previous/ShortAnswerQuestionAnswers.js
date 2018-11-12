import React from 'react';
import PropTypes from 'prop-types';
import { Subheader, Paper } from 'material-ui';

class ShortAnswerQuestionAnswers extends React.PureComponent {
  render() {
    const indexes = this.props.randomIndexes;
    const selectedAnswers = [];
    const numberOfAnswers = this.props.answers.length < indexes.length ? this.props.answers.length : indexes.length;

    for (let i = 0; i < numberOfAnswers; i++) {
      const selectedAnswer = this.props.answers[indexes[i]];
      selectedAnswers.push(selectedAnswer);
      this.props.answers.splice(indexes[i], 1);
    }
    let index = 0;
    return (
      <div style={{ marginTop: '10px', textAlign: 'left', overflow: 'auto', maxHeight: '370px' }}>
        <Subheader style={{ fontSize: '18px' }}>Varasemad vastused</Subheader>
        {selectedAnswers.map((answer) => {
          index += 1;
          return (
            <Paper key={index} zDepth={0}>
              <Subheader>{'Vastus ' + index}</Subheader>
              <div style={{ margin: '0px 0px 10px 17px', color: '#000000de' }}>
                {answer}
              </div>
            </Paper>
          );
        }
        )}
      </div>
    );
  }
}

ShortAnswerQuestionAnswers.propTypes = {
  answers: PropTypes.array.isRequired,
  randomIndexes: PropTypes.array.isRequired
};

export default ShortAnswerQuestionAnswers;
