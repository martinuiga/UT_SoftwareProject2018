import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import confirm from '../util/confirmation/ConfirmUtil';

const buttonsStyle = {
  textAlign: 'right',
  marginRight: '40px'
};

class ActionButtons extends React.PureComponent {
  handleClickSaveButton = () => {
    if (this.props.isSaved) {
      this.props.changeCurrentQuestionIndex();
    }
    this.props.changeIsSaved();
  };

  handleClickSkipButton = () => {
    if (this.props.isAnswered) {
      confirm('Vastus ei ole salvestatud. Kas olete kindel?')
        .then(() => this.props.changeCurrentQuestionIndex())
        .catch(() => { });
    } else {
      this.props.changeCurrentQuestionIndex();
    }
  }

  render() {
    return (
      <div style={buttonsStyle}>
        <RaisedButton
          style={{ marginRight: '10px' }}
          label="Jäta vahele"
          onClick={this.handleClickSkipButton}
          disabled={this.props.isSaved}
        />
        <RaisedButton
          label={this.props.isSaved ? 'Järgmine' : 'Salvesta'}
          onClick={this.handleClickSaveButton}
        />
      </div>
    );
  }
}

ActionButtons.propTypes = {
  isSaved: PropTypes.bool,
  isAnswered: PropTypes.bool,
  changeCurrentQuestionIndex: PropTypes.func.isRequired,
  changeIsSaved: PropTypes.func.isRequired
};

ActionButtons.defaultProps = {
  isSaved: false,
  isAnswered: false
};

export default ActionButtons;
