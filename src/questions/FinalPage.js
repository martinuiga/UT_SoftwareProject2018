import React from 'react';
import PropTypes from 'prop-types';

import { RaisedButton } from 'material-ui';

const FinalPage = (props) => {
  return (
    <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
      <p>
        Täname vastamast!<br />Uuesti vastamiseks klõpsa nupul.
      </p>
      <RaisedButton
        label="Uuesti vastama"
        onClick={() => props.answerAgain()}
      />
    </div>
  );
};

FinalPage.propTypes = {
  answerAgain: PropTypes.func.isRequired
};

export default FinalPage;
