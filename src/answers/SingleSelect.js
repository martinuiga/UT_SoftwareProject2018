import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class SingleSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    const initialState = { [props.question.answerChoices[0]]: false };
    this.state = initialState;
  }

  getAnswer = () => {
    const answerChoices = this.props.question.answerChoices;

    for (let i = 0; i < answerChoices.length; i++) {
      const answerChoice = answerChoices[i];
      if (this.state[answerChoice]) {
        return answerChoice;
      }
    }
    return null;
  };

  handleChange = name => event => {
    if (Object.keys(this.state).length === 1) {
      this.props.changeIsAnswered(true);
    }

    this.props.question.answerChoices.forEach((choice) => {
      this.setState({ [choice]: false }); // tühistab kõigi valimise enne uue valimist
    });
    this.setState({ [name]: event.target.checked });
  };

  renderAnswerChoice = (choice) => {
    return (
      <FormControlLabel
        key={choice}
        style={{ marginLeft: '200px', display: 'flex' }}
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
  question: PropTypes.object.isRequired,
  changeIsAnswered: PropTypes.func.isRequired
};

export default SingleSelect;
