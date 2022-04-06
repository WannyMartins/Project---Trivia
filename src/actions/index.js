import tokenAPI from './API';

export const REQUEST_API_TOKEN = 'REQUEST_API_TOKEN';
export const REQUEST_API_TOKEN_SUCESS = 'REQUEST_API_TOKEN_SUCESS';
export const REQUEST_API_TOKEN_FAIL = 'REQUEST_API_TOKEN_FAIL';
export const SET_USERNAME_EMAIL = 'SET_USERNAME_EMAIL';

export const setUser = (name, gravatarEmail) => ({ // Função para pegar o email e nome do usuário
  type: SET_USERNAME_EMAIL,
  name,
  gravatarEmail, // O parâmetro passado precisa ter o mesmo nome usado no reducer.
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
