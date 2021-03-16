export const validation = (inputs) => {
  //Email errors
  const errors = {};

  if (!inputs.firstname) {
    errors.firstname = "First name is required!";
  }
  if (!inputs.lastname) {
    errors.lastname = "Last name is required!";
  }
  if (!inputs.emailid) {
    errors.emailid = "Please enter valid email address!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.emailid)) {
    errors.emailid = "Invalid email address!";
  }

  //Password Errors
  if (inputs && inputs.password) {
    inputs.password = inputs.password.trim();
  }
  if (inputs.password.length === 0) {
    errors.password = "Please enter password!";
  }
  if (inputs && (!inputs.password || inputs.password.length < 8)) {
    errors.password = "Password should be greater than 8 characters!";
  }
  if (
    inputs &&
    inputs.password.length > 8 &&
    inputs.password.search(/[a-z]/) < 1 &&
    inputs.password.search(/[A-Z]/) < 1
  ) {
    errors.password = "Should contain lower and uppercase letters!";
  }
  if (
    inputs &&
    ((inputs.firstname.length > 0 &&
      inputs.password.toLowerCase().indexOf(inputs.firstname.toLowerCase()) !==
        -1) ||
      (inputs.lastname.length > 0 &&
        inputs.password.toLowerCase().indexOf(inputs.lastname.toLowerCase()) !==
          -1))
  ) {
    errors.password = "Password should not contains first name or last name!";
  }

  return errors;
};
