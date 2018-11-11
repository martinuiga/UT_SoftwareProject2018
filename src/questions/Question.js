import React from 'react';
import PropTypes from 'prop-types';
import { Subheader } from 'material-ui';

const Question = (props) => {
  return (
    <Subheader style={{ fontSize: '20px', lineHeight: '30px', margin: '10px 0px 10px 0px' }}>
      {props.title}
    </Subheader>
  );
};

Question.propTypes = {
  title: PropTypes.string.isRequired
};

export default Question;
