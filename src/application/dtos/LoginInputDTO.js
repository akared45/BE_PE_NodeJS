class LoginInputDTO {
  constructor(data) {
    if (!data.email || !data.password) {
      throw new Error("InvalidInput: Email and password are required");
    }
    this.email = data.email.trim().toLowerCase();
    this.password = data.password;
  }
}

module.exports = LoginInputDTO;
