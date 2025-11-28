const RegisterInputDTO = require("../../application/dtos/RegisterInputDTO");
const LoginInputDTO = require("../../application/dtos/LoginInputDTO");

class AuthController {
  constructor({
    registerUserUseCase,
    loginUserUseCase,
    refreshTokenUseCase,
    logoutUserUseCase,
  }) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
    this.refreshTokenUseCase = refreshTokenUseCase;
    this.logoutUserUseCase = logoutUserUseCase;
  }

  // POST /api/auth/register
  register = async (req, res) => {
    try {
      const inputDTO = new RegisterInputDTO(req.body);
      const outputDTO = await this.registerUserUseCase.execute(inputDTO);
      res.status(201).json(outputDTO);
    } catch (error) {
      if (error.message.startsWith("UserRegistrationFailed")) {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // POST /api/auth/login
  login = async (req, res) => {
    try {
      const inputDTO = new LoginInputDTO(req.body);
      const outputDTO = await this.loginUserUseCase.execute(inputDTO);
      res.status(200).json(outputDTO);
    } catch (error) {
      if (
        error.message.startsWith("AuthenticationFailed") ||
        error.message.startsWith("UserAccountInactive")
      ) {
        return res
          .status(401)
          .json({ message: "Invalid credentials or inactive account." }); // 401 Unauthorized
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

const createAuthController = () => {
  const {
    registerUserUseCase,
    loginUserUseCase,
    refreshTokenUseCase,
    logoutUserUseCase,
  } = require("../config/dependencies");
  return new AuthController({
    registerUserUseCase,
    loginUserUseCase,
    refreshTokenUseCase,
    logoutUserUseCase,
  });
};

module.exports = { AuthController, createAuthController };
