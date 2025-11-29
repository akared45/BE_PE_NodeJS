const RegisterRequest = require("../../application/dtos/requests/auth/RegisterRequest");
const LoginRequest = require("../../application/dtos/requests/auth/LoginRequest");
const RefreshTokenRequest = require("../../application/dtos/requests/auth/RefreshTokenRequest");

class AuthController {
  constructor({
    registerPatientUseCase,
    loginUserUseCase,
    refreshTokenUseCase,
    logoutUserUseCase
  }) {
    this.registerPatientUseCase = registerPatientUseCase;
    this.loginUserUseCase = loginUserUseCase;
    this.refreshTokenUseCase = refreshTokenUseCase;
    this.logoutUserUseCase = logoutUserUseCase;
  }
  register = async (req, res, next) => {
    try {
      const requestDto = new RegisterRequest(req.body);
      const result = await this.registerPatientUseCase.execute(requestDto);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const requestDto = new LoginRequest(req.body);
      const result = await this.loginUserUseCase.execute(requestDto);
      if (result.refreshToken) {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const token = req.cookies?.refreshToken || req.body.refreshToken;
      const requestDto = new RefreshTokenRequest({ refreshToken: token });
      const result = await this.refreshTokenUseCase.execute(requestDto);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      const token = req.cookies?.refreshToken || req.body.refreshToken;
      await this.logoutUserUseCase.execute(token);
      res.clearCookie('refreshToken');
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;