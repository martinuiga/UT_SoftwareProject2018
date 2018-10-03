import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';

import QuestionFormContainer from '../containers/QuestionFormContainer';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <QuestionFormContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;
