import kinds from '../constants/error.kind';

export default error => {
  const { kind } = error;
  switch (kind) {
    case kinds.FORMAT:
      return 'No amount was determined';

    case kinds.MINIMUM:
      return `This field has minimum value of ${error.min}`;

    default:
      break;
  }
};
