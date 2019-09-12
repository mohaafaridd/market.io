import { getErrorMessage } from '../../messages/register';

export const clearErrors = () => {
  const fields = document.querySelectorAll('.error');
  fields.forEach(field => (field.innerHTML = ''));
};

export const displayError = error => {
  const className = '.' + error.path;
  const field = document.querySelector('.error' + className);
  if (field) {
    field.innerHTML = getErrorMessage(error);
  }
};
