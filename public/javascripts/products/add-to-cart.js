import axios from 'axios';

// const addToCartBtn = document.getElementById('add-to-cart-btn') || null;
const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');

for (const cartBtn of addToCartButtons) {
  cartBtn.addEventListener('click', async e => {
    e.preventDefault();

    // const product = document.getElementById('product-id').value;
    // const store = document.getElementById('store-id').value;
    // const amount = document.getElementById('amount').value;

    const { parentElement: form } = cartBtn;

    const product = form.querySelector('input[name="product-id"]').value;
    const store = form.querySelector('input[name="store-id"]').value;
    const amount = form.querySelector('input[name="amount"]').value;

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
  });
}

// if (addToCartBtn) {
//   addToCartBtn.addEventListener('click', async e => {
//     e.preventDefault();

//     const product = document.getElementById('product-id').value;
//     const store = document.getElementById('store-id').value;
//     const amount = document.getElementById('amount').value;

//     try {
//       const response = await axios.post('/carts/api', {
//         product,
//         store,
//         amount,
//       });

//       console.log('response.data :', response.data);
//     } catch (error) {
//       console.log('error.response :', error.response);
//     }
//   });
// }
