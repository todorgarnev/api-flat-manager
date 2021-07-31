import IRegisterInput from "../interfaces/register.interface";
import { regEx } from "../constants/input-constants";
import ILoginInput from "../interfaces/login.interface";

const validateRegisterInput = (registerInput: IRegisterInput) => {
  let errors: IRegisterInput = {};

  if (!registerInput) {
    return {
      errors: {
        username: "Username must not be empty",
        email: "Email must not be empty",
        password: "Password must not be empty",
        confirmPassword: "Repeat Password must not be empty"
      },
      valid: false
    };
  }

  if (!registerInput.username || (registerInput.username && registerInput.username.trim() === "")) {
    errors = { username: "Username must not be empty" };
  }

  if (!registerInput.email || (registerInput.email && registerInput.email.trim() === "")) {
    errors = { ...errors, email: "Email must not be empty" };
  }

  if (registerInput.email && !registerInput.email.match(regEx)) {
    errors = { ...errors, email: "Email must be a valid email address" };
  }

  if (!registerInput.password || registerInput.password === "") {
    errors = { ...errors, password: "Password must not be empty" };
  }

  if (!registerInput.confirmPassword || registerInput.confirmPassword === "") {
    errors = { ...errors, confirmPassword: "Confirm Password must not be empty" };
  }

  if (registerInput.password !== registerInput.confirmPassword) {
    errors = { ...errors, confirmPassword: "Passwords must match" };
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validateLoginInput = (loginInput: ILoginInput) => {
  let errors: ILoginInput = {};

  if (!loginInput) {
    return {
      errors: {
        username: "Username must not be empty",
        password: "Password must not be empty",
      },
      valid: false
    };
  }

  if (!loginInput.username || (loginInput.username && loginInput.username.trim() === "")) {
    errors = { username: "Username must not be empty" };
  }


  if (!loginInput.password || loginInput.password === "") {
    errors = { ...errors, password: "Password must not be empty" };
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
}


export {
  validateRegisterInput,
  validateLoginInput
};