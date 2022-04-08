import { REQUEST_API_QUESTION_SUCESS } from '../actions';

const INITIAL_STATE = {
  disableNextButton: false,
  disableAnswerButton: false,
  nextButtonHide: true,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_QUESTION_SUCESS:
    return {
      ...state,
      results: action.results,
    };
  default:
    return state;
  }
};

export default questions;
