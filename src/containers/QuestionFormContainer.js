import { connect } from 'react-redux';
import QuestionForm from '../questions/QuestionForm';
import { getQuestions } from '../api/QuestionsService';

const mapStateToProps = (state) => ({
  questions: getQuestions()
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
