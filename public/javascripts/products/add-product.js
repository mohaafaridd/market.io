import axios from 'axios';
import grabForm from '../formGrabber';

const addProductBtn = document.getElementById('add-product-button');
addProductBtn.addEventListener('click', async e => {
  e.preventDefault();

  const form = grabForm(['name']);
  console.log('form :', form);
});
