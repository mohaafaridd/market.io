import { validateAmount } from './fields.validator';

export default form => {
  const {
    amount,
    category,
    color,
    description,
    discount,
    manufacturer,
    model,
    name,
    price,
  } = form;

  const isValidAmount = validateAmount(amount);

  console.log(isValidAmount);
};
