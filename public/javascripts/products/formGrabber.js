export default () => ({
  name: document.getElementById('name')
    ? document.getElementById('name').value
    : undefined,
  model: document.getElementById('model')
    ? document.getElementById('model').value
    : undefined,
  description: document.getElementById('description')
    ? document.getElementById('description').value
    : undefined,
  color: document.getElementById('color')
    ? document.getElementById('color').value
    : undefined,
  amount: document.getElementById('amount')
    ? document.getElementById('amount').value
    : undefined,
  price: document.getElementById('price')
    ? document.getElementById('price').value
    : undefined,
  discount: document.getElementById('discount')
    ? document.getElementById('discount').value
    : undefined,
});
