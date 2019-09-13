import {
  validateGroupOne,
  validateGroupTwo,
  validateDescription,
  validateDiscount,
} from './fields.validator';

export default form => {
  const {
    // Group One
    amount,
    price,

    // Group Two
    category,
    manufacturer,
    name,
    model,
    color,

    // Non Grouped
    description,
    discount,
  } = form;

  const isValidAmount = validateGroupOne(amount, 'amount');
  const isValidPrice = validateGroupOne(price, 'price');

  const isValidCategory = validateGroupTwo(category, 'category');
  const isValidManufacturer = validateGroupTwo(manufacturer, 'manufacturer');
  const isValidName = validateGroupTwo(name, 'name');
  const isValidModel = validateGroupTwo(model, 'model');
  const isValidColor = validateGroupTwo(color, 'color');

  const isValidDescription = validateDescription(description);
  const isValidDiscount = validateDiscount(discount);

  const validators = [
    isValidAmount,
    isValidPrice,
    isValidCategory,
    isValidManufacturer,
    isValidName,
    isValidModel,
    isValidColor,
    isValidDescription,
    isValidDiscount,
  ];

  const invalidFields = validators.filter(field => field.success === false);

  return invalidFields;
};
