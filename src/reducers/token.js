import { REQUEST_API_TOKEN_SUCESS } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_TOKEN_SUCESS:

    return action.token;

  default:
    return state;
  }
};

export default token;
