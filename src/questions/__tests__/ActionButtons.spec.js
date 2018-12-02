import React from 'react';
import { clone } from 'ramda';
import { shallow } from 'enzyme';

import ActionButtons from '../ActionButtons';

describe('<ActionButtons />', () => {
  let wrapper;

  const mockChangeCurrentQuestionIndex = jest.fn();
  const mockChangeIsSaved = jest.fn();
  const mockChangeShowPreviousAnswers = jest.fn();
  const mockChangeIsAnswered = jest.fn();
  const mockSaveAnswer = jest.fn();

  const props = {
    isSaved: false,
    isAnswered: false,
    showPreviousAnswers: false,
    isShortAnswerQuestion: false,
    changeCurrentQuestionIndex: mockChangeCurrentQuestionIndex,
    changeIsSaved: mockChangeIsSaved,
    changeShowPreviousAnswers: mockChangeShowPreviousAnswers,
    containsCurseWords: jest.fn(),
    toggleCurseModal: jest.fn(),
    changeIsAnswered: mockChangeIsAnswered,
    saveAnswer: mockSaveAnswer
  };

  beforeAll(() => {
    wrapper = shallow(<ActionButtons {...props} />);
  });

  it('renders something', () => {
    expect(wrapper.length).toEqual(1);
  });

  describe('handleClickSkipButton', () => {
    it('calls changeShowPreviousAnswers if no answer has been written nor saved and' +
    ' previous answers haven\'t been shown', () => {
      wrapper.instance().handleClickSkipButton();
      expect(mockChangeShowPreviousAnswers).toBeCalled();
    });

    it('calls changeCurrentQuestionIndex if previous answers have been showed', () => {
      const locProps = clone(props);
      locProps.showPreviousAnswers = true;

      wrapper = shallow(<ActionButtons {...locProps} />);
      wrapper.instance().handleClickSkipButton();

      expect(mockChangeCurrentQuestionIndex).toBeCalled();
    });
  });

  describe('handleClickSaveButton', () => {
    it('calls changeCurrentQuestionIndex if answer has been saved', () => {
      const locProps = clone(props);
      locProps.isSaved = true;

      wrapper = shallow(<ActionButtons {...locProps} />);
      wrapper.instance().handleClickSaveButton();

      expect(mockChangeCurrentQuestionIndex).toBeCalled();
    });

    it('calls saveAnswer, changeIsAnswered and changeShowPreviousAnswers' +
    ' if answers hasn\'t been saved and question is not short answer question', () => {
      wrapper = shallow(<ActionButtons {...props} />);
      wrapper.instance().handleClickSaveButton();

      expect(mockSaveAnswer).toBeCalled();
      expect(mockChangeIsSaved).toBeCalled();
      expect(mockChangeShowPreviousAnswers).toBeCalledWith(true);
    });
  });
});
