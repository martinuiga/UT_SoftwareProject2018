import React from 'react';
import { isEmpty, merge } from 'ramda';
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

    this.setState({ answerText: '' });
    return answer;
  };

  handleAnswerTextChange = (e) => {
    if (!this.props.isAnswered && !isEmpty(e.target.value)) {
      this.props.changeIsAnswered(true);
    }
    if (isEmpty(e.target.value)) {
      this.props.changeIsAnswered(false);
    }
    this.setState(prevState => merge(prevState, { answerText: e.target.value }));
  };

  render() {
    return (
      <TextField
        id="shortTextAnswer"
        value={this.state.answerText}
        onChange={this.handleAnswerTextChange}
        label="Vastus"
        multiline
        rows="4"
        margin="normal"
        variant="filled"
        helperText={helperText}
        inputProps={{ maxLength: MAXIMUM_CHARACTER_COUNT }}
        style={{ width: '450px' }}
      />
    );
  }
}

ShortAnswer.propTypes = {
  isAnswered: PropTypes.bool,
  changeIsAnswered: PropTypes.func.isRequired
};

ShortAnswer.defaultProps = {
  isAnswered: false
};

export default ShortAnswer;
