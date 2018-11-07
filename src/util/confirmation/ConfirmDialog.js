import PropTypes from 'prop-types';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import { confirmable } from 'react-confirm';
import { FlatButton } from 'material-ui/';
import { MuiThemeProvider } from 'material-ui/styles';


const ConfirmDialog = ({ title, modal, show, cancelLabel, okLabel, cancel, proceed, dismiss, confirmation }) => {
  const dialogActions = [
    <FlatButton
      label={cancelLabel || 'Tühista'}
      secondary
      onClick={cancel}
    />,
    <FlatButton
      label={okLabel || 'OK'}
      primary
      onClick={proceed}
    />
  ];

  return (
    <MuiThemeProvider>
      <Dialog
        title={title || 'Kinnitus'}
        actions={dialogActions}
        modal={modal}
        open={show}
        onRequestClose={dismiss}
      >
        {confirmation || 'Olete kindel?'}
      </Dialog>
    </MuiThemeProvider>
  );
};

ConfirmDialog.propTypes = {
  modal: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  proceed: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  okLabel: PropTypes.func,
  cancelLabel: PropTypes.func,
  title: PropTypes.func,
  confirmation: PropTypes.string
};

ConfirmDialog.defaultProps = {
  modal: true,
  okLabel: null,
  cancelLabel: null,
  title: null,
  confirmation: null
};

export default confirmable(ConfirmDialog);
