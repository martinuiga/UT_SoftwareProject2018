import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class MultipleSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    const initialState = {};

    props.question.answerChoices.forEach((choice) => {
      initialState[choice] = false;
    });
    this.state = initialState;
  }

  getAnswers = () => {
    const answerChoices = this.props.question.answerChoices;
    const selectedAnswers = [];

    for (let i = 0; i < answerChoices.length; i++) {
      const answerChoice = answerChoices[i];
      if (this.state[answerChoice]) {
        selectedAnswers.push(answerChoice);
      }
    }
    return selectedAnswers;
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });

    if (Object.values(this.state).includes(true) || event.target.checked) {
      this.props.changeIsAnswered(true);
    }
  };

  renderAnswerChoice = (choice) => {
    return (
      <FormControlLabel
        key={choice}
        style={{ margin: '0px 0px -10px 200px', display: 'flex' }}
        control={(
          <Checkbox
            checked={this.state[choice]}
            onChange={this.handleChange(choice)}
            value={choice}
            disabled={this.props.showAnswers}
          />
        )}
        label={choice}
      />
    );
  }

  renderAnswerChoices = (answerChoices) => {
    return answerChoices.map(choice => {
      return this.renderAnswerChoice(choice);
    });
  }

  render() {
    return (
      <FormGroup>
        {this.renderAnswerChoices(this.props.question.answerChoices)}
      </FormGroup>
    );
  }
}

MultipleSelect.propTypes = {
  question: PropTypes.object.isRequired,
  showAnswers: PropTypes.bool.isRequired,
  changeIsAnswered: PropTypes.func.isRequired
};

export default MultipleSelect;
