import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';

import QuestionsForm from '../questions/QuestionsForm';
import { getQuestions } from '../api/QuestionsService';

class App extends Component {
  render() {
    console.log('getQuestions', getQuestions());
    return (
      <MuiThemeProvider>
        <QuestionsForm />
      </MuiThemeProvider>
    );
  }
}

export default App;
