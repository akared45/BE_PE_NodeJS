class RegisterOutputDTO {
  constructor(user) {
    this.id = user.id.toString();
    this.email = user.email;
    this.username = user.username;
    this.userType = user.userType;
    this.message = "User registered successfully. Proceed to login.";
  }
}
module.exports = RegisterOutputDTO;
