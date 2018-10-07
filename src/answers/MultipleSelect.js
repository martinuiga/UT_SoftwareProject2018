import React from 'react';
import { merge } from 'ramda';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class MultipleSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    const initialState = {};
    props.question.answerChoices.forEach((choice) => {
      merge(initialState, { [choice]: false });
    });
    this.state = initialState;
  }

  handleChange = name => event => {
    console.log('NAME', name);
    this.setState({ [name]: event.target.checked });
  };

  renderAnswerChoice = (choice) => {
    return (
      <FormControlLabel
        key={choice}
        style={{ display: 'flex', justifyContent: 'center' }}
        control={(
          <Checkbox
            checked={this.state[choice]}
            onChange={this.handleChange(choice)}
            value={choice}
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
  question: PropTypes.object.isRequired
};

export default MultipleSelect;
