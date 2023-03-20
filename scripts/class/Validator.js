export class Validator {
  lastName;
  firstName;
  email;
  password;
  confirmPassword;

  #checkValidationName(value) {
    // const REGEXP = /^([A-Z]{1}[a-z]{1,30})$/;
    const REGEXP = /^([a-zA-Z]{2,20})$/;
    if (value === "") {
      return "Please fill in the field";
    }
    if (REGEXP.test(value)) {
      return true;
    } else {
      return "Only letters";
    }
  }

  #checkValidationPassword(value) {
    // const REGEXP = /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{8,}/g;
    const REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (value === "") {
      return "Please fill in the field ";
    }
    if (REGEXP.test(value)) {
      return true;
    } else {
      return "Password must contain from 8 characters, upper and lower case letters and numbers";
    }
  }
  #checkValidationEmail(value) {
    const REGEXP =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (value === "") {
      return "Please fill in the field ";
    }
    if (REGEXP.test(value)) {
      return true;
    } else {
      return "The email was entered incorrectly";
    }
  }

  #checkValidationConfirmPassword(pass, confirmPass) {
    if (pass === confirmPass) {
      return true;
    } else {
      return "Passwords don't match";
    }
  }

  setLastName(value) {
    this.lastName = value;
  }
  setFirstName(value) {
    this.firstName = value;
  }

  setEmail(value) {
    this.email = value;
  }

  setPassword(value) {
    this.password = value;
  }
  setConfirmPassword(value) {
    this.confirmPassword = value;
  }

  getLastName() {
    return this.#checkValidationName(this.lastName);
  }
  getFirstName() {
    return this.#checkValidationName(this.firstName);
  }

  getEmail() {
    return this.#checkValidationEmail(this.email);
  }

  getPassword() {
    return this.#checkValidationPassword(this.password);
  }
  getConfirmPassword() {
    return this.#checkValidationConfirmPassword(
      this.password,
      this.confirmPassword
    );
  }

  #result() {
    let arr = [
      this.getLastName(),
      this.getFirstName(),
      this.getEmail(),
      this.getPassword(),
      this.getConfirmPassword(),
    ];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== true) {
        return false;
      }
    }
    return true
  }

  getResult(){
    return this.#result()
  }
}
