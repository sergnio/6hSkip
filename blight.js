const axios = require('axios');

/**
 * Simple get request using axios and async/await syntax
 */
const url = 'https://jsonplaceholder.typicode.com/posts/1';
const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// getData(url);

/**
 * Login using claypooljake@gmail.com : pizza into blight
 */
const loginUrl = 'https://blight.ironhelmet.com/arequest/login';

const login = async () => {
  try {
    let response = await axios.post(
      'https://blight.ironhelmet.com/arequest/login?type=login&alias=claypooljake%40gmail.com&password=pizza'
    );

    console.log(response);
    // console.log(response.headers['set-cookie']);
  } catch (err) {
    console.log(err);
  }
};

login();
