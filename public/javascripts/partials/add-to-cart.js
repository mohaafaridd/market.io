import axios from 'axios';
import { grabElementsByName } from '../util/formGrabber';

const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');

for (const cartBtn of addToCartButtons) {
  cartBtn.addEventListener('click', async e => {
    e.preventDefault();
    cartBtn.disabled = true;

    const { parentElement: form } = cartBtn;
    const fields = ['product-id', 'store-id'];

    const elements = grabElementsByName(form, fields);

    const product = elements['product-id'];
    const store = elements['store-id'];

    try {
      const response = await axios.post('/carts/api', {
        product,
        store,
      });

      console.log('response.data :', response.data);
    } catch (error) {
      console.log('error.response :', error.response);
    }

    cartBtn.disabled = false;
  });
}
