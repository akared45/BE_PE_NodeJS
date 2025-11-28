class LoginOutputDTO {
  constructor({ user, accessToken, refreshToken, expiresIn }) {
    this.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      userType: user.userType,
      fullName: user.fullName,
    };
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}

module.exports = LoginOutputDTO;
