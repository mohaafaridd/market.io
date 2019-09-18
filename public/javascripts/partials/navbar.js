import axios from 'axios';
import { getCookie } from '../util/cookies';
const logout = document.getElementById('logout') || null;

if (logout) {
  logout.addEventListener('click', async e => {
    e.preventDefault();
    const cookie = getCookie('client');
    const route = `${cookie.role.toLowerCase()}s`;

    await axios.post(`/${route}/api/logout`);
    window.location.replace('/');
  });
}
