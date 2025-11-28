const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthService = require("../../application/services/AuthService");
require("dotenv").config();

const JWT_SECRETKEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_EXPIRY = "1m";
const REFRESH_TOKEN_EXPYRY = 7 * 24 * 60 * 60 * 1000;

class JwtAuthService extends AuthService {
  constructor() {
    super();
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  generateAccessToken(userId, userType) {
    const payload = {
      id: userId,
      type: userType,
    };
    return jwt.sign(payload, JWT_SECRETKEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
  }

  generateRefreshToken() {
    return require("crypto").randomUUID();
  }

  getAccessTokenExpiry() {
    return 60;
  }

  getRefreshTokenExpiry() {
    return new Date(Date.now() + REFRESH_TOKEN_EXPYRY);
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, JWT_SECRETKEY);
    } catch (error) {
      return null;
    }
  }
}

module.exports = JwtAuthService;
