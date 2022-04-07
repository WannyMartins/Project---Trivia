const url = 'https://opentdb.com/api_token.php?command=request';

export const tokenAPI = async () => {
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export const questionAPI = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await request.json();
  // console.log(response);
  return response;
};
