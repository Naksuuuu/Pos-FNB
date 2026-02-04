export const parseValidationErrors = (errorResponse) => {
  const errors = errorResponse?.errors || errorResponse?.data;

  if (!errors) {
    return {
      validationErrors: {},
      allErrors: [],
    };
  }

  const validationErrors = {};
  const errorMessages = [];

  Object.entries(errors).forEach(([field, messages]) => {
    const messageArray = Array.isArray(messages) ? messages : [messages];

    validationErrors[field] = messageArray[0];

    messageArray.forEach((msg) => {
      errorMessages.push(msg);
    });
  });

  return {
    validationErrors,
    allErrors: errorMessages,
  };
};

export const createValidationError = (errorResponse, defaultMessage = "Validation Error") => {
  const { validationErrors, allErrors } = parseValidationErrors(errorResponse);

  const error = new Error(errorResponse.message || defaultMessage);
  error.validationErrors = validationErrors;
  error.allErrors = allErrors;
  error.status = 422;
  error.isValidationError = true;

  return error;
};
