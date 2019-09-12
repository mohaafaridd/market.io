import axios from 'axios';
import faker from 'faker';
import {
  getForm,
  validateForm,
  errorHandler,
  clearErrors,
} from './formValidator';
const registerBtn = document.getElementById('register-submit-button');

registerBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    clearErrors();

    const form = getForm();
    const invalidFields = validateForm(form);

    if (invalidFields.length) {
      // Shows errors on DOM
      invalidFields.forEach(field => errorHandler(field));
    }

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
