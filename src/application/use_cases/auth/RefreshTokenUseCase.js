const RefreshTokenResponse = require("../../dtos/responses/auth/RefreshTokenResponse");
const { AuthorizationException } = require("../../../domain/exceptions");

class RefreshTokenUseCase {
  constructor({ userSessionRepository, userRepository, tokenService }) {
    this.userSessionRepository = userSessionRepository;
    this.userRepository = userRepository;
    this.tokenService = tokenService; 
  }
  async execute(request) {
    const { refreshToken } = request;
    const session = await this.userSessionRepository.findByRefreshToken(refreshToken);

    if (!session || !session.isValid()) {
      throw new AuthorizationException("Invalid, expired, or revoked refresh token");
    }

    const decoded = this.tokenService.verifyToken(refreshToken);
    if (!decoded) {
       throw new AuthorizationException("Invalid token signature");
    }

    const user = await this.userRepository.findById(session.userId);

    if (!user || !user.isActive) {
      const revokedSession = session.revoke();
      await this.userSessionRepository.save(revokedSession);
      throw new AuthorizationException("User not found or inactive");
    }
    const payload = {
        sub: user.id.toString(),
        role: user.userType
    };
    
    const newAccessToken = this.tokenService.generateAccessToken(payload);

    return new RefreshTokenResponse({
      accessToken: newAccessToken,
      refreshToken: session.refreshToken,
      expiresIn: this.tokenService.getAccessTokenExpiry()
    });
  }
}

module.exports = RefreshTokenUseCase;