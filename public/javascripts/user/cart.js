import axios from 'axios';

const deleteSingleProductButtons = document.getElementsByClassName(
  'delete-single-product'
);

for (const deleteButton of deleteSingleProductButtons) {
  deleteButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('deleted');
  });
}
