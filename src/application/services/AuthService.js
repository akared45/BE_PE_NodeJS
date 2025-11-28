class AuthService {
  async hashPassword(password) {
    throw new Error("Method not implemented: hashPassword");
  }

  async comparePassword(password, hash) {
    throw new Error("Method not implemented: comparePassword");
  }

  generateAccessToken(userId, userType) {
    throw new Error("Method not implemented: generateAccessToken");
  }

  verifyAccessToken(token) {
    throw new Error("Method not implemented: verifyAccessToken");
  }

  generateRefreshToken() {
    throw new Error("Method not implemented: generateRefreshToken");
  }

  getAccessTokenExpiry() {
    throw new Error("Method not implemented: getAccessTokenExpiry");
  }

  getRefreshTokenExpiry() {
    throw new Error("Method not implemented: getRefreshTokenExpiry");
  }
}

module.exports = AuthService;
