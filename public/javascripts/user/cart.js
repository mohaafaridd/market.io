import axios from 'axios';
import { grabElementsByName, grabDOMElementByName } from '../util/formGrabber';

const deleteSingleProductButtons = document.getElementsByClassName(
  'delete-single-product'
);
const clearCartButton = document.getElementById('delete-all');
const patchAmountButtons = document.getElementsByClassName('patch-amount');

clearCartButton.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const response = await axios.post('/carts/api/clear');
    console.log('response.data :', response.data);
    location.reload();
  } catch (error) {
    console.log('error.response.data :', error.response.data);
  }
});

for (const deleteButton of deleteSingleProductButtons) {
  deleteButton.addEventListener('click', async e => {
    e.preventDefault();

    const { parentElement: form } = deleteButton;
    const fields = ['product-id', 'amount'];

    const elements = grabElementsByName(form, fields);

    const product = elements['product-id'];
    const amount = isNaN(parseInt(elements['amount']))
      ? 1
      : parseInt(elements['amount']);

    try {
      const response = await axios.post('/carts/api/delete-item', {
        product,
        amount,
      });
      console.log('response.data :', response.data);
      location.reload();
    } catch (error) {
      console.log('error.response.data :', error.response.data);
    }
  });
}

for (const patchBtn of patchAmountButtons) {
  patchBtn.addEventListener('click', async e => {
    e.preventDefault();
    try {
      const { name: mode } = e.target;
      const validModes = ['increase', 'decrease'];
      const isValid = validModes.includes(mode);
      if (!isValid) {
        throw new Error('Invalid mode');
      }

      const { parentElement: form } = patchBtn;
      const fields = ['product-id', 'amount'];
      const elements = grabElementsByName(form, fields);
      const product = elements['product-id'];
      const amount = grabDOMElementByName(form, 'amount');
      console.log(amount);

      const response = await axios.patch('/carts/api/', {
        product,
        mode,
      });

      if (response.data.success) {
        amount.value = response.data.cart.amount;
      }

      console.log('response.data :', response.data);
    } catch (error) {
      console.log(error);
    }
  });
}
