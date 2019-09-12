import axios from 'axios';
// import { getForm, displayError, clearErrors } from './formGrabber';
import grabForm from './formGrabber';

const loginBtn = document.getElementById('login-submit-button');

loginBtn.addEventListener('click', async e => {
  e.preventDefault();

  const form = grabForm();
  // const isValid =
});
