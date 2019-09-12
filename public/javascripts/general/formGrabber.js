export default () => ({
  name: document.getElementById('name')
    ? document.getElementById('name').value
    : undefined,
  phone: document.getElementById('phone')
    ? document.getElementById('phone').value
    : undefined,
  email: document.getElementById('email')
    ? document.getElementById('email').value
    : undefined,
  password: document.getElementById('password')
    ? document.getElementById('password').value
    : undefined,
  repassword: document.getElementById('repassword')
    ? document.getElementById('repassword').value
    : undefined,
});
