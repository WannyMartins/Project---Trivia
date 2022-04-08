import {
  CHANGE_BUTTONS_COLOR,
  CHANGE_BUTTON_NEXT_VALUE,
  REQUEST_API_QUESTION_SUCESS,
  TIMER_SET
} from '../actions';

const INITIAL_STATE = {
  disableNextButton: false,
  colorAnswerButtons: false,
  nextButtonHide: true,
  timer: 0,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_QUESTION_SUCESS:
    return {
      ...state,
      results: action.results,
    };
  case CHANGE_BUTTON_NEXT_VALUE:
    return {
      ...state,
      nextButtonHide: action.nextButtonHide,
    };
  case CHANGE_BUTTONS_COLOR:
    return {
      ...state,
      colorAnswerButtons: action.colorAnswerButtons,
    };
  case TIMER_SET:
    return { ...state, timer: action.timer };
  default:
    return state;
  }
};

export default questions;
