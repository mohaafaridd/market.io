import axios from 'axios';
import faker from 'faker';

if (document.title === 'Register') {
  const registerBtn = document.getElementById('register-submit-button');

  registerBtn.addEventListener('click', async e => {
    e.preventDefault();

    try {
      const response = await axios({
        method: 'POST',
        url: '/users/api/register',
        data: {
          user: {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber('010########'),
            password: faker.internet.password(10),
          },
        },
      });
      console.log('response :', response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  });
}
