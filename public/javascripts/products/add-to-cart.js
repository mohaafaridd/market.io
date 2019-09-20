import axios from 'axios';

// const addToCartBtn = document.getElementById('add-to-cart-btn') || null;
const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');

for (const cartBtn of addToCartButtons) {
  cartBtn.addEventListener('click', async e => {
    e.preventDefault();
    const fields = ['product-id', 'store-id', 'amount'];

    // This block is not for humans
    const elements = [
      // Step 1: extracting the form elements from the click event
      // tip 1: you can't loop on the result without destructuring it
      // tip 2: I couldn't find a scenario where I need another form this should explain the [0]
      ...e.path.filter(obj => obj instanceof HTMLFormElement)[0].elements,
    ]
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

    console.log('elements :', elements);

    // .map(element => {
    //   if (element instanceof HTMLInputElement) {
    //     return { name: element.name, value: element.value };
    //   }
    // });

    // const product = document.getElementById('product-id').value;
    // const store = document.getElementById('store-id').value;
    // const amount = document.getElementById('amount').value;

    const { parentElement: form } = cartBtn;

    console.log('form :', form.elements);

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
