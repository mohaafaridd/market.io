import axios from 'axios';
import elementsExtractor from '../util/formFieldsExtractor';

const deleteSingleProductButtons = document.getElementsByClassName(
  'delete-single-product'
);

const clearCartButton = document.getElementById('delete-all');

for (const deleteButton of deleteSingleProductButtons) {
  deleteButton.addEventListener('click', async e => {
    e.preventDefault();

    const { parentElement: form } = deleteButton;
    const fields = ['product-id', 'amount'];

    const elements = elementsExtractor(form, fields);

    const product = elements['product-id'];
    const amount = isNaN(parseInt(elements['amount']))
      ? 1
      : parseInt(elements['amount']);

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
