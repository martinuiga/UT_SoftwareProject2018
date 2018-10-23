import { structurizeQuestions } from '../QuestionsService';

describe('testing QuestionsService', () => {
  const APIresponseData = [
    {
      title: {
        rendered: 'Kas see test läheb läbi?'
      },
      acf: {
        is_single_select: true,
        single_select_choices: 'jah;ei'
      }
    }
  ];
  const expected = [
    {
      question: 'Kas see test läheb läbi?',
      type: 'single-select-question',
      answerChoices: ['jah', 'ei']
    }
  ];

  it('data from API structurized correctly', () => {
    const questions = structurizeQuestions(APIresponseData);
    expect(questions).toEqual(expected);
  });
});
