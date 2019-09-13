import registrationErrors from '../messages/register';
import addProductErrors from '../messages/add-product';
import forms from '../constants/forms';

export const clearErrors = () => {
  const fields = document.querySelectorAll('.error');
  fields.forEach(field => (field.innerHTML = ''));
};

export const displayError = (error, form) => {
  const className = '.' + error.path;
  const field = document.querySelector('.error' + className);
  if (field) {
    switch (form) {
      case forms.REGISTRATION:
      case forms.LOGIN:
        field.innerHTML = registrationErrors(error);
        break;

      case forms.ADD_PRODUCT:
        field.innerHTML = addProductErrors(error);
      default:
        break;
    }
  }
};
