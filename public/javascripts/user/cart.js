import axios from 'axios';
import { grabElementsByName, grabDOMElementByName } from '../util/formGrabber';

const patchBtns = document.querySelectorAll('.patch-amount');
const deleteBtns = document.querySelectorAll('.delete-cart');

for (const button of patchBtns) {
  button.addEventListener('click', async e => {
    e.preventDefault();
    button.disabled = true;

    const { parentElement: form } = button;
    const { parentElement: card } = form;
    const fields = ['cart-id'];
    const elements = grabElementsByName(form, fields);

    const cart = elements['cart-id'];
    const mode = button.name === 'increase' ? 'increase' : 'decrease';
    const amount = grabDOMElementByName(form, 'amount');
    try {
      const response = await axios.patch(`/carts/api/${cart}`, {
        mode,
      });
      // amount.value = response.data.cart.amount;

      const newCard = await axios.get(`/carts/cards/${cart}`);
      console.log('newCard :', newCard);
      card.innerHTML = newCard.data;

      console.log('response.data :', response.data);
    } catch (error) {
      console.log('error.response :', error.response);
    }
    button.disabled = false;
  });
}

for (const button of deleteBtns) {
  button.addEventListener('click', async e => {
    e.preventDefault();
    button.disabled = true;

    const { parentElement: form } = button;
    const { parentElement: card } = form;
    const fields = ['cart-id'];
    const elements = grabElementsByName(form, fields);

    const cart = elements['cart-id'];
    try {
      const response = await axios.delete(`/carts/api/${cart}`);
      card.remove();
      console.log('response.data :', response.data);
    } catch (error) {
      console.log('error.response :', error.response);
    }

    button.disabled = false;
  });
}

// const patchCart = e => {
//   e.preventDefault();
// };
