import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import confirm from '../util/confirmation/ConfirmUtil';

const buttonsStyle = {
  textAlign: 'right',
  marginRight: '40px'
};

class ActionButtons extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showPreviousAnswers: this.props.showPreviousAnswers };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.isShortAnswerQuestion) {
        this.setState({ showPreviousAnswers: true });
      } else {
        this.setState({
          showPreviousAnswers: this.props.showPreviousAnswers
        });
      }
    }
  }

  handleClickSaveButton = () => {
    if (!this.props.isSaved) {
      this.props.saveAnswer();
      this.props.changeIsSaved();
    } else {
      this.props.changeCurrentQuestionIndex();
    }
  };

  handleClickSkipButton = () => {
    let showPreviousAnswers = true;

    if (this.props.isAnswered) {
      confirm('Vastus ei ole salvestatud. Kas olete kindel?')
        .then(() => {
          this.props.changeCurrentQuestionIndex();
          this.props.changeShowPreviousAnswers(false);
        })
        .catch(() => { });
    }
    if (this.state.showPreviousAnswers) {
      this.props.changeCurrentQuestionIndex();
      showPreviousAnswers = false;
    }
    this.props.changeShowPreviousAnswers(showPreviousAnswers);
  }

  render() {
    return (
      <div style={buttonsStyle}>
        <RaisedButton
          style={{ marginRight: '10px' }}
          label={this.state.showPreviousAnswers ? 'Jäta vahele' : 'Jäta vahele ja vaata vastuseid'}
          onClick={this.handleClickSkipButton}
          disabled={this.props.isSaved}
        />
        <RaisedButton
          label={this.props.isSaved ? 'Järgmine' : 'Salvesta'}
          onClick={this.handleClickSaveButton}
          disabled={!this.props.isShortAnswerQuestion && this.state.showPreviousAnswers}
        />
      </div>
    );
  }
}

ActionButtons.propTypes = {
  isSaved: PropTypes.bool,
  isAnswered: PropTypes.bool,
  showPreviousAnswers: PropTypes.bool.isRequired,
  isShortAnswerQuestion: PropTypes.bool,
  changeCurrentQuestionIndex: PropTypes.func.isRequired,
  changeIsSaved: PropTypes.func.isRequired,
  changeShowPreviousAnswers: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired
};

ActionButtons.defaultProps = {
  isSaved: false,
  isAnswered: false,
  isShortAnswerQuestion: false
};

export default ActionButtons;
