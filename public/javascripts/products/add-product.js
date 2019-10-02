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

  try {
    const response = await axios({
      method: 'POST',
      url: '/products/api/',
      data: { product: form },
    });

    const id = response.data.product._id;
    const formData = new FormData();
    const image = document.getElementById('image');
    formData.append('picture', image.files[0]);

    const imageRequest = await axios.patch(
      `/products/api/${id}/picture`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    window.location.replace(`/products/${response.data.product._id}`);
  } catch (error) {
    console.log(error);
  }
});
