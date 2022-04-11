import { ASSERTIONS_COUNT, SCORE_COUNT, SET_USERNAME_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USERNAME_EMAIL:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case SCORE_COUNT:
    return {
      ...state,
      score: action.score + state.score,
    };
  case ASSERTIONS_COUNT:
    return {
      ...state,
      assertions: action.assertions + state.assertions,
    };
  default:
    return state;
  }
};

export default player;
