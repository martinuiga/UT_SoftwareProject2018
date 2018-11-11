import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Paper, Dialog } from 'material-ui';

const CurseModal = (props) => {

  const closeModal = () => {
    props.toggleCurseModal();
  };

  const actions = [
    <FlatButton
      label="Selge"
      primary
      onClick={closeModal}
    />
  ];

  return (
    <Paper style={{ backgroundColor: '#EEEEEE' }}>
      <Dialog
        actions={actions}
        modal={false}
        open={props.modalOpen}
        onRequestClose={closeModal}
      >
        {'Teie vastus sisaldas sobimatuid sõnu. Teie vastust ei salvestatud.'}
      </Dialog>
    </Paper >
  );
};

CurseModal.propTypes = {
  toggleCurseModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired
};

export default CurseModal;
