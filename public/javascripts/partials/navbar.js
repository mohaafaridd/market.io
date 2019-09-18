import axios from 'axios';
import { getCookie } from '../util/cookies';
const logout = document.getElementById('logout') || null;

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
