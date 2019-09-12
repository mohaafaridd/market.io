import axios from 'axios';
import faker from 'faker';
import { getForm, validateForm } from './formValidator';
const registerBtn = document.getElementById('register-submit-button');

registerBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const form = getForm();
    const isValid = validateForm(form);

    const response = await axios({
      method: 'POST',
      url: '/users/api/register',
      data: {
        user: {
          name: faker.name.firstName(),
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
