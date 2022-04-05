const INITIAL_STATE = {
  token: {},
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API_TOKEN_SUCESS':
    return {
      ...state,
      token: action.tok,
    };
  default:
    return state;
  }
};

export default token;
