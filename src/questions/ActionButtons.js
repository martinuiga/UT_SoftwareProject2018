import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import { FacebookProvider, Share } from 'react-facebook';
import confirm from '../util/confirmation/ConfirmUtil';

const buttonsStyle = {
  textAlign: 'right',
  marginRight: '40px'
};

class ActionButtons extends React.PureComponent {

  handleClickSaveButton = () => {
    if (!this.props.isSaved) {
      if (this.props.isShortAnswerQuestion) {
        const containsCurseWords = this.props.containsCurseWords();
        if (containsCurseWords === true) {
          this.props.toggleCurseModal();
          this.props.changeIsAnswered(false);
        } else {
          this.props.saveAnswer();
          this.props.changeIsSaved();
        }
      } else {
        this.props.saveAnswer();
        this.props.changeIsSaved();
        this.props.changeShowPreviousAnswers(true);
      }
    } else {
      this.props.changeCurrentQuestionIndex();
    }
  };

  handleClickSkipButton = () => {

    if (this.props.isAnswered) {
      confirm('Vastus ei ole salvestatud. Kas olete kindel?')
        .then(() => {
          this.props.changeIsAnswered(false);
          this.props.changeShowPreviousAnswers(true);

          if (this.props.isShortAnswerQuestion) {
            this.props.changeCurrentQuestionIndex();
          }
        })
        .catch(() => { });
    } else if (this.props.showPreviousAnswers) {
      this.props.changeCurrentQuestionIndex();
    } else {
      this.props.changeShowPreviousAnswers(true);
    }
  };

  render() {
    const disableSaveButton = this.props.isShortAnswerQuestion ? false : this.props.showPreviousAnswers && !this.props.isSaved;
    // TODO share href juurde töötav jagatav link
    return (
      <div style={buttonsStyle}>
        <FacebookProvider appId="490127188159867">
          <Share href="http://e-terminoloogia.herokuapp.com/">
            {({ handleClick, loading }) => (
              <RaisedButton
                style={{ marginRight: '10px' }}
                buttonStyle={{ backgroundColor: '#f7f5e7b3' }}
                type="button"
                onClick={handleClick}
                label="Jaga"
              />
            )}
          </Share>
        </FacebookProvider>
        <RaisedButton
          style={{ marginRight: '10px' }}
          buttonStyle={{ backgroundColor: '#f7f5e7b3' }}
          label={this.props.showPreviousAnswers ? 'Jäta vahele' : 'Jäta vahele ja vaata vastuseid'}
          onClick={this.handleClickSkipButton}
          disabled={this.props.isSaved}
        />
        <RaisedButton
          label={this.props.isSaved ? 'Järgmine' : 'Vasta'}
          onClick={this.handleClickSaveButton}
          disabled={disableSaveButton}
          buttonStyle={{ backgroundColor: '#f7f5e7b3' }}
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
  containsCurseWords: PropTypes.func.isRequired,
  toggleCurseModal: PropTypes.func.isRequired,
  changeIsAnswered: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired
};

ActionButtons.defaultProps = {
  isSaved: false,
  isAnswered: false,
  isShortAnswerQuestion: false
};

export default ActionButtons;
