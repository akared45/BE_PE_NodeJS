const LoginOutputDTO = require("../dtos/LoginOutputDTO");

class RefreshTokenUseCase {
  constructor(userSessionRepository, userRepository, authService) {
    // Phụ thuộc vào cả 3 interfaces
    this.userSessionRepository = userSessionRepository;
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(refreshToken) {
    // 1. Tìm phiên làm việc bằng Refresh Token
    const session = await this.userSessionRepository.findByRefreshToken(
      refreshToken
    );

    // 2. Kiểm tra tính hợp lệ của Session (Logic Ứng dụng/Domain)
    if (!session || session.isExpired() || session.isRevoked()) {
      throw new Error(
        "InvalidSession: Refresh token is invalid, expired, or revoked."
      );
    }

    // 3. Tìm User để xác nhận
    const user = await this.userRepository.findById(session.userId);
    if (!user || !user.isActive) {
      // Thu hồi session nếu User không còn tồn tại hoặc không hoạt động
      await this.userSessionRepository.revokeSession(refreshToken);
      throw new Error(
        "UserNotFound: Associated user is inactive or does not exist."
      );
    }

    // 4. Tạo Access Token mới (Sử dụng IAuthService)
    const newAccessToken = this.authService.generateAccessToken(
      user.id.value,
      user.userType
    );

    // 5. Trả về DTO mới
    return new LoginOutputDTO({
      user: user,
      accessToken: newAccessToken,
      refreshToken: session.refreshToken, // Giữ nguyên Refresh Token cũ
      expiresIn: this.authService.getAccessTokenExpiry(),
    });
  }
}

module.exports = RefreshTokenUseCase;
