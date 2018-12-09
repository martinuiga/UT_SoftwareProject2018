import React from 'react';
import PropTypes from 'prop-types';

import { RaisedButton } from 'material-ui';

const WelcomePage = (props) => {
  return (
    <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
      <p>
        Aita edendada eesti terminitööd!<br />Vastamise alustamiseks klõpsa nupul.
      </p>
      <RaisedButton
        label="Alusta vastamist"
        onClick={() => props.startAnswering()}
        buttonStyle={{ backgroundColor: '#f7f5e7b3' }}
      />
    </div>
  );
};

WelcomePage.propTypes = {
  startAnswering: PropTypes.func.isRequired
};

export default WelcomePage;
