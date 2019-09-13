import axios from 'axios';
import forms from '../constants/forms';
import grabForm from '../util/formGrabber';
import validateForm from './validators/add-product.validator';
import { clearErrors, displayError } from '../util/error.handle';

const addProductBtn = document.getElementById('add-product-button');

addProductBtn.addEventListener('click', async e => {
  e.preventDefault();

  clearErrors();

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

  const invalidFields = validateForm(form);

  // Shows errors on DOM if there is
  if (invalidFields.length) {
    return invalidFields.forEach(field =>
      displayError(field, forms.ADD_PRODUCT)
    );
  }
});
