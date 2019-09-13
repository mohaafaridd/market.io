const logout = document.getElementById('logout') || null;

if (logout) {
  logout.addEventListener('click', async e => {
    e.preventDefault();
    console.log('You have logged out');
  });
}
