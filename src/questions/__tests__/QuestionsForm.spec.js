import React from 'react';
import { shallow } from 'enzyme';

import QuestionsForm, { renderCorrectAnswerOptions } from '../QuestionsForm';
import SingleSelect from '../../answers/SingleSelect';
import MultipleSelect from '../../answers/MultipleSelect';
import ShortAnswer from '../../answers/ShortAnswer';

describe('<QuestionsForm />', () => {
  it('renders something', () => {
    const wrapper = shallow(<QuestionsForm />);
    expect(wrapper.length).toEqual(1);
  });

  it('renderCorrectAnswerOptions renders SingleSelect when' +
  ' question type is single-select-question', () => {
    const question = {
      question: 'Single select question',
      type: 'single-select-question',
      answerChoices: ['answer1', 'answer2']
    };
    const answerOptions = renderCorrectAnswerOptions(question);
    expect(answerOptions.type).toEqual(SingleSelect);
  });

  it('renderCorrectAnswerOptions renders MultipleSelect when' +
  ' question type is multiple-select-question', () => {
    const question = {
      question: 'Multiple select question',
      type: 'multiple-select-question',
      answerChoices: ['answer1', 'answer2']
    };
    const answerOptions = renderCorrectAnswerOptions(question);
    expect(answerOptions.type).toEqual(MultipleSelect);
  });

  it('renderCorrectAnswerOptions renders ShortAnswer when' +
  ' question type is short-answer-question', () => {
    const question = {
      question: 'Short answer question',
      type: 'short-answer-question',
      answerChoices: []
    };
    const answerOptions = renderCorrectAnswerOptions(question);
    expect(answerOptions.type).toEqual(ShortAnswer);
  });
});
