import kinds from '../constants/error.kind';

export default registrationErrors = error => {
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

    case kinds.FORMAT:
      return error.path === 'email' && 'Please enter a valid Email address';

    case kinds.MATCH:
      return (
        error.path === 'repassword' && 'This field has to match the password'
      );

    case kinds.UNIQUE:
      return `A user is already registered with this ${error.path}`;

    default:
      break;
  }
};
