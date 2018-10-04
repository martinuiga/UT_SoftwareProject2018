import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';

import QuestionsForm from '../questions/QuestionsForm';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <QuestionsForm />
      </MuiThemeProvider>
    );
  }
}

export default App;
