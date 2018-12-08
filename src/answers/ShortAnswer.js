import React from 'react';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const MAXIMUM_CHARACTER_COUNT = 150;
const helperText = 'Vastus võib olla maksimaalselt ' +
  MAXIMUM_CHARACTER_COUNT +
  ' tähemärgi pikkune';

class ShortAnswer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answerText: ''
    };
  }

  getAnswer = () => {
    const answer = this.state.answerText;
    return answer;
  };

  clearAnswer = () => {
    this.setState({ answerText: '' });
  }

  handleAnswerTextChange = (e) => {
    if (!this.props.isAnswered && !isEmpty(e.target.value)) {
      this.props.changeIsAnswered(true);
    }
    if (isEmpty(e.target.value)) {
      this.props.changeIsAnswered(false);
    }
    this.setState({ answerText: e.target.value });
  };

  render() {
    return (
      <TextField
        id="shortTextAnswer"
        label="Vastus"
        value={this.state.answerText}
        multiline
        rows="4"
        margin="normal"
        variant="filled"
        disabled={this.props.disabled}
        helperText={helperText}
        onChange={this.handleAnswerTextChange}
        inputProps={{ maxLength: MAXIMUM_CHARACTER_COUNT }}
        style={{ width: '450px' }}
      />
    );
  }
}

ShortAnswer.propTypes = {
  isAnswered: PropTypes.bool,
  changeIsAnswered: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

ShortAnswer.defaultProps = {
  isAnswered: false
};

export default ShortAnswer;
