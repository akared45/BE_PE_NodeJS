const UserSession = require("../../domain/entities/UserSession");
const LoginOutputDTO = require("../dtos/LoginOutputDTO");
const LoginInputDTO = require("../dtos/LoginInputDTO");

class LoginUserUseCase {
  constructor(userRepository, authService, userSessionRepository) {
    this.userRepository = userRepository;
    this.authService = authService;
    this.userSessionRepository = userSessionRepository;
  }

  async execute(data) {
    const input = new LoginInputDTO(data);
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("AuthenticationFailed: Invalid credentials");
    }
    const isPasswordValid = await this.authService.comparePassword(
      input.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error("AuthenticationFailed: Invalid credentials.");
    }

    if (!user.isActive) {
      throw new Error("UserAccountInactive: Account has been deactivated.");
    }

    const refreshToken = this.authService.generateRefreshToken();
    const sessionExpiresAt = this.authService.getRefreshTokenExpiry();

    const userSession = new UserSession({
      userId: user.id.value,
      refreshToken: refreshToken,
      expiresAt: sessionExpiresAt,
    });

    await this.userSessionRepository.save(userSession);

    const accessToken = this.authService.generateAccessToken(
      user.id.value,
      user.userType
    );

    return new LoginOutputDTO({
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: this.authService.getAccessTokenExpiry(),
    });
  }
}

module.exports = LoginUserUseCase;
