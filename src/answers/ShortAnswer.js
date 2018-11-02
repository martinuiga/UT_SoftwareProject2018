import React from 'react';
import { merge } from 'ramda';
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

  handleAnswerTextChange = (event) => {
    event.persist();
    this.setState((prevState) => merge(prevState, { answerText: event.target.value }));
  }

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

export default ShortAnswer;
