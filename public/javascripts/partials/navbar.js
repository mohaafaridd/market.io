import axios from 'axios';
import { getCookie } from '../util/cookies';
const logout = document.getElementById('logout') || null;
const searchBtn = document.getElementById('search-btn') || null;
const searchText = document.getElementById('search-text') || null;

if (logout) {
  logout.addEventListener('click', async e => {
    e.preventDefault();
    try {
      const cookie = getCookie('client');
      const route = `${cookie.role.toLowerCase()}s`;
      const response = await axios.post(`/${route}/api/logout`);
      alert(response.data.message);
      window.location.replace('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  });
}

searchBtn.addEventListener('click', async e => {
  e.preventDefault();
  searchBtn.disabled = true;
  try {
    if (!searchText.value) {
      throw new Error('Enter a value to search for!');
    }
    window.location.replace(`/search?name=${searchText.value}`);
  } catch (error) {
    alert(error.message);
  }
  searchBtn.disabled = false;
});
