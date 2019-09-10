import axios from 'axios';

const registerBtn = document.getElementById('register-submit-button');

registerBtn.addEventListener('click', async e => {
  e.preventDefault();

  const response = await axios({
    method: 'POST',
    url: '/users/api/register',
    data: {
      user: {
        firstname: 'Mohammed',
        lastname: 'Farid',
        email: 'Mohammed@gmail.com',
        phone: '01234567215',
        password: '123456',
      },
    },
  });

  console.log('response :', response.data.user);
});
