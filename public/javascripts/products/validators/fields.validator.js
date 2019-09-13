import kinds from '../../constants/error.kind';

export const validateGroupOne = (property, path) => {
  property = parseInt(property);

  if (!property && property !== 0) {
    return { success: false, kind: kinds.REQUIRED, path };
  }

  if (property < 0) {
    return { success: false, kind: kinds.MINIMUM, min: 0, path };
  }

  return { success: true, path };
};

export const validateGroupTwo = (property, path) => {
  property = property.trim();
  if (!property.length) {
    return { success: false, kind: kinds.REQUIRED, path };
  }

  if (property.length > 36) {
    return { success: false, kind: kinds.LONG, length: 36, path };
  }

  if (property.length < 2) {
    return { success: false, kind: kinds.SHORT, length: 2, path };
  }

  return { success: true, path };
};

export const validateDescription = description => {
  description = description.trim();
  if (!description.length) {
    return { success: false, kind: kinds.REQUIRED, path: 'description' };
  }

  if (description.length > 300) {
    return {
      success: false,
      kind: kinds.LONG,
      length: 36,
      path: 'description',
    };
  }

  if (description.length < 2) {
    return {
      success: false,
      kind: kinds.SHORT,
      length: 2,
      path: 'description',
    };
  }

  return { success: true, path: 'description' };
};

export const validateDiscount = discount => {
  discount = parseInt(discount);
  if (!discount && discount !== 0) {
    return { success: false, kind: kinds.REQUIRED, path: 'discount' };
  }

  if (discount < 0) {
    return { success: false, kind: kinds.MINIMUM, min: 0, path: 'discount' };
  }

  if (discount > 100) {
    return { success: false, kind: kinds.MAXIMUM, max: 100, path: 'discount' };
  }

  return { success: true, path: 'discount' };
};
