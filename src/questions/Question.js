import React from 'react';
import PropTypes from 'prop-types';
import { Subheader } from 'material-ui';

const Question = (props) => {
  return (
    <Subheader style={{ fontSize: '20px' }}>
      {props.title}
    </Subheader>
  );
};

Question.propTypes = {
  title: PropTypes.string.isRequired
};

export default Question;
