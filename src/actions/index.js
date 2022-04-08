import { questionAPI, tokenAPI } from './API';

export const SET_USERNAME_EMAIL = 'SET_USERNAME_EMAIL';
export const SCORE_COUNT = 'SCORE_COUNT';
export const ASSERTIONS_COUNT = 'ASSERTIONS_COUNT';

export const CHANGE_BUTTON_NEXT_VALUE = 'CHANGE_BUTTON_NEXT_VALUE';
export const CHANGE_BUTTONS_COLOR = 'CHANGE_BUTTONS_COLOR';
export const DISABLE_BUTTONS_ANSWER = 'DISABLE_BUTTONS_ANSWER';

export const REQUEST_API_TOKEN = 'REQUEST_API_TOKEN';
export const REQUEST_API_TOKEN_SUCESS = 'REQUEST_API_TOKEN_SUCESS';
export const REQUEST_API_TOKEN_FAIL = 'REQUEST_API_TOKEN_FAIL';
export const REQUEST_API_QUESTION = 'REQUEST_API_QUESTION';
export const REQUEST_API_QUESTION_SUCESS = 'REQUEST_API_QUESTION_SUCESS';
export const REQUEST_API_QUESTION_FAIL = 'REQUEST_API_QUESTION_FAIL';

export const setUser = (name, gravatarEmail) => ({ // Função para pegar o email e nome do usuário
  type: SET_USERNAME_EMAIL,
  name,
  gravatarEmail, // O parâmetro passado precisa ter o mesmo nome usado no reducer.
});

export const countScore = (score) => ({
  type: SCORE_COUNT,
  score,
});

export const countAssertions = (assertions) => ({
  type: ASSERTIONS_COUNT,
  assertions,
});
export const tokenRequest = () => ({ // Função para complementar a requisição da API
  type: REQUEST_API_TOKEN,
});

export const tokenRequestFail = (error) => ({ // Função para alertar erro da requisição da API
  type: REQUEST_API_TOKEN_FAIL, error,
});

export const tokenRequestSucess = ({ token }) => ({ // Função para dizer que foi um sucesso a requisição da API
  type: REQUEST_API_TOKEN_SUCESS,
  token,
});

export const tokenRequestAPI = () => async (dispatch) => { // Despacha para o store o resultado da requisição
  dispatch(tokenRequest()); // Invoca o primeiro Type
  try {
    // console.log('tokenRequest');
    const request = await tokenAPI(); // Pesquisa na URL a moeda
    dispatch(tokenRequestSucess(request)); // Caso ache, ela entrará aqui e retorna-rá a moeda escolhida
  } catch (e) {
    dispatch(tokenRequestFail(e)); // Em caso de falha, irá disparar esse erro.
  }
};

export const questionRequest = () => ({ // Função para complementar a requisição da API
  type: REQUEST_API_QUESTION,
});

export const questionRequestFail = (error) => ({ // Função para alertar erro da requisição da API
  type: REQUEST_API_QUESTION_FAIL, error,
});

export const questionRequestSucess = (results) => ({ // Função para dizer que foi um sucesso a requisição da API
  type: REQUEST_API_QUESTION_SUCESS,
  results,
});

export const questionRequestAPI = (token) => async (dispatch) => { // Despacha para o store o resultado da requisição
  dispatch(questionRequest()); // Invoca o primeiro Type
  try {
    const request = await questionAPI(token); // Pesquisa na URL a moeda
    dispatch(questionRequestSucess(request)); // Caso ache, ela entrará aqui e retorna-rá a moeda escolhida
    return request;
  } catch (e) {
    dispatch(questionRequestFail(e)); // Em caso de falha, irá disparar esse erro.
  }
};

export const changeButtonNextValue = (nextButtonHide) => ({
  type: CHANGE_BUTTON_NEXT_VALUE,
  nextButtonHide: !nextButtonHide,
});

export const changeColorButtons = (colorAnswerButtons) => ({
  type: CHANGE_BUTTONS_COLOR,
  colorAnswerButtons: !colorAnswerButtons,
});
