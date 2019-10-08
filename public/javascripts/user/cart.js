import axios from 'axios';
import forms from '../constants/forms';
import { patchValidation } from './validators/cart.validator';
import { grabElementsByName, grabDOMElementByName } from '../util/formGrabber';
import { clearErrors, displayError } from '../util/error.handle';

const deleteSingleProductButtons = document.getElementsByClassName(
  'delete-single-product'
);
const clearCartButton = document.getElementById('clear-cart');
const orderCartButton = document.getElementById('order-now');
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

orderCartButton.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const response = await axios.post('/orders/api/');
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
    console.log('product :', product);
    try {
      const response = await axios.delete(`/carts/api/${product}`);
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
      clearErrors();
      const { parentElement: form } = patchBtn;
      console.log('form :', form);
      const fields = ['product-id', 'amount'];
      const elements = grabElementsByName(form, fields);
      const { name: mode } = e.target;

      const invalidFields = patchValidation(mode, elements);

      // Shows errors on DOM if there is
      if (invalidFields.length) {
        return invalidFields.forEach(field =>
          displayError(field, forms.ADD_PRODUCT)
        );
      }

      const product = elements['product-id'];
      console.log('here', elements);
      const amount = grabDOMElementByName(form, 'amount');

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
