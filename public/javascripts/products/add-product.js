import axios from 'axios';
import grabForm from '../util/formGrabber';

const addProductBtn = document.getElementById('add-product-button');
addProductBtn.addEventListener('click', async e => {
  e.preventDefault();

  const form = grabForm([
    'category',
    'manufacturer',
    'name',
    'model',
    'description',
    'color',
    'amount',
    'price',
    'discount',
  ]);
});
