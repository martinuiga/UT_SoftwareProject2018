import React from 'react';
import { Subheader } from 'material-ui';

const Question = (props) => {
  return (
    <Subheader style={{ fontSize: '20px' }}>
      {props.title}
    </Subheader>
  );
};

export default Question;
