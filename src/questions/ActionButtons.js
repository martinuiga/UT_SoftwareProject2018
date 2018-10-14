import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';

const buttonsStyle = {
  textAlign: 'right',
  marginRight: '40px'
};

class ActionButtons extends React.PureComponent {
  render() {
    return (
      <div style={buttonsStyle}>
        <RaisedButton
          label="Järgmine"
          onClick={this.props.changeCurrentQuestionIndex}
        />
      </div>
    );
  }
}

ActionButtons.propTypes = {
  changeCurrentQuestionIndex: PropTypes.func.isRequired
};

export default ActionButtons;
