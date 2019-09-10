import axios from 'axios';

const registerBtn = document.getElementById('register-submit-button');

registerBtn.addEventListener('click', async e => {
  e.preventDefault();

  try {
    const response = await axios({
      method: 'POST',
      url: '/users/api/register',
      data: {
        user: {
          firstname: 'Mohammed',
          lastname: 'Farid',
          email: 'Mohammed@gmail.com',
          phone: '01012227',
          password: '123456',
        },
      },
    });
    console.log('response :', response.data);
  } catch (error) {
    console.log(error.response.data);
  }
});
