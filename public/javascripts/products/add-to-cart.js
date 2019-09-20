import axios from 'axios';

// const addToCartBtn = document.getElementById('add-to-cart-btn') || null;
const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');

for (const cartBtn of addToCartButtons) {
  cartBtn.addEventListener('click', async e => {
    e.preventDefault();
    cartBtn.disabled = true;

    const { parentElement: form } = cartBtn;
    const fields = ['product-id', 'store-id'];

    // This block is not for humans
    const elements = [...form.elements]
      // filter elements if they have a name and that's valid for my field list
      .filter(element => element.name && fields.includes(element.name))
      // map over the filtered array to make an array of these objects
      .map(element => ({ name: element.name, value: element.value }))
      // Well, this reduce is from stackoverflow :v
      // reduce takes every element and assign it to the final Object
      .reduce(
        (obj, element) => Object.assign(obj, { [element.name]: element.value }),
        {}
      );

    const product = elements['product-id'];
    const store = elements['store-id'];

    try {
      const response = await axios.post('/carts/api', {
        product,
        store,
        amount: 1,
      });

      console.log('response.data :', response.data);
    } catch (error) {
      console.log('error.response :', error.response);
    }

    cartBtn.disabled = false;
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
