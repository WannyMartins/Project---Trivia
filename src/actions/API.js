const url = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = async () => {
  const request = await fetch(url);
  const response = request.json();
  console.log(url);
  return response;
};

export default tokenAPI;
