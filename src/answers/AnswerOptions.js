import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class AnswerOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'exp1'
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            name="example"
            value={this.state.value}
            onChange={(event, value) => this.handleChange(value)}
          >
            <FormControlLabel
              value="exp1"
              control={<Radio color="primary" />}
              label="Example 1"
              labelPlacement="start"
            />
            <FormControlLabel
              value="exp2"
              control={<Radio color="primary" />}
              label="Example 2"
              labelPlacement="start"
            />
            <FormControlLabel
              value="exp3"
              control={<Radio color="primary" />}
              label="Example 3"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default AnswerOptions;
