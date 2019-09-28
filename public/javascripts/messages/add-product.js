import kinds from '../constants/error.kind';

export default error => {
  const { kind } = error;

  switch (kind) {
    case kinds.REQUIRED:
      return 'This field is required';

    case kinds.MINIMUM:
      return `This field has minimum value of ${error.min}`;

    case kinds.MAXIMUM:
      return `This field has maximum value of ${error.max}`;

    case kinds.LONG:
      return `This field has maximum length of ${error.length}`;

    case kinds.SHORT:
      return `This field has minimum length of ${error.length}`;

    default:
      return error;
      break;
  }
};
