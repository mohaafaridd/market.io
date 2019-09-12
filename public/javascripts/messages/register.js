import kinds from '../constants/error.kind';

export const getErrorMessage = error => {
  const { kind } = error;

  switch (kind) {
    case kinds.REQUIRED:
      return 'This field is required';

    case kinds.LONG:
      return `This field has maximum length of ${error.length}`;

    case kinds.SHORT:
      return `This field has minimum length of ${error.length}`;

    case kinds.LENGTH:
      return `This field has to be ${error.length} character long`;

    case kinds.REGEX:
      return (
        error.path === 'phone' &&
        `This field has to fit the Egyptian Phone Format`
      );

    default:
      break;
  }
};
