import axios from 'axios';
import grabForm from '../util/formGrabber';
import validateForm from './validators/add-product.validator';

const addProductBtn = document.getElementById('add-product-button');
addProductBtn.addEventListener('click', async e => {
  e.preventDefault();

  console.log('here');

  const form = grabForm([
    'amount',
    'category',
    'color',
    'description',
    'discount',
    'manufacturer',
    'model',
    'name',
    'price',
  ]);

  validateForm(form);
});
