import axios from 'axios';

const deleteSingleProductButtons = document.getElementsByClassName(
  'delete-single-product'
);

const clearCartButton = document.getElementById('delete-all');

for (const deleteButton of deleteSingleProductButtons) {
  deleteButton.addEventListener('click', async e => {
    e.preventDefault();

    const { parentElement: form } = deleteButton;
    const fields = ['product-id', 'amount'];

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
    const amount = parseInt(elements['amount']);

    const response = await axios.post('/carts/api/delete-item', {
      product,
      amount,
    });

    // delete card of cart element
    const { parentElement: card } = form;
    card.remove();

    console.log('response.data :', response.data);
  });
}
