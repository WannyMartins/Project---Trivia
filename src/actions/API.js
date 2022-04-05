const url = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = async () => {
  const request = await fetch(url);
  const response = await request.json();
  console.log(response);
  return response;
};

export default tokenAPI;
