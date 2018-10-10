import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class SingleSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    const initialState = { [props.question.answerChoices[0]]: true };
    this.state = initialState;
  }

  handleChange = name => event => {
    this.props.question.answerChoices.forEach((choice) => {
      this.setState({ [choice]: false }); // tühistab kõigi valimise enne uue valimist
    });
    this.setState({ [name]: event.target.checked });
  };

  renderAnswerChoice = (choice) => {
    return (
      <FormControlLabel
        key={choice}
        style={{ display: 'flex', justifyContent: 'center' }}
        control={(
          <Radio
            checked={this.state[choice] === true}
            onChange={this.handleChange(choice)}
            value={choice}
          />
        )}
        label={choice}
      />
    );
  };

  renderAnswerChoices = (answerChoices) => {
    return answerChoices.map(choice => {
      return this.renderAnswerChoice(choice);
    });
  };

  render() {
    return (
      <RadioGroup>
        {this.renderAnswerChoices(this.props.question.answerChoices)}
      </RadioGroup>
    );
  }
}

SingleSelect.propTypes = {
  question: PropTypes.object.isRequired
};

export default SingleSelect;
