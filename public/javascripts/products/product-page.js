import axios from 'axios';

const addToCartBtn = document.getElementById('add-to-cart-btn') || null;
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', async e => {
    e.preventDefault();

    const product = document.getElementById('product-id');
    const store = document.getElementById('store-id');
    const amount = document.getElementById('amount');

    try {
      const response = await axios.post('/carts/api', {
        product: {
          id: product.value,
          amount: amount.value,
        },
        store: {
          id: store.value,
        },
      });

      console.log('response.data :', response.data);
      console.log('added to cart');
    } catch (error) {
      console.log('error.response :', error.response);
    }
  });
}
