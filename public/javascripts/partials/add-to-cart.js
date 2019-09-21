import axios from 'axios';
import elementsExtractor from '../util/formFieldsExtractor';

// const addToCartBtn = document.getElementById('add-to-cart-btn') || null;
const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');

for (const cartBtn of addToCartButtons) {
  cartBtn.addEventListener('click', async e => {
    e.preventDefault();
    cartBtn.disabled = true;

    const { parentElement: form } = cartBtn;
    const fields = ['product-id', 'store-id', 'amount'];

    const elements = elementsExtractor(form, fields);

    const product = elements['product-id'];
    const store = elements['store-id'];
    const amount = isNaN(parseInt(elements['amount']))
      ? 1
      : parseInt(elements['amount']);

    try {
      const response = await axios.post('/carts/api', {
        product,
        store,
        amount,
      });

      console.log('response.data :', response.data);
    } catch (error) {
      console.log('error.response :', error.response);
    }

    cartBtn.disabled = false;
  });
}
