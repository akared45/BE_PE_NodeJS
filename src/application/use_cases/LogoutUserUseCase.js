class LogoutUserUseCase {
  constructor(userSessionRepository) {
    // Chỉ phụ thuộc vào IUserSessionRepository
    this.userSessionRepository = userSessionRepository;
  }

  async execute(refreshToken) {
    // 1. Tìm phiên làm việc
    const session = await this.userSessionRepository.findByRefreshToken(
      refreshToken
    );

    if (!session) {
      // Vẫn coi là thành công nếu token không tồn tại để tránh lỗi lộ thông tin
      return true;
    }

    // 2. Nếu session tồn tại và chưa bị thu hồi, tiến hành thu hồi
    if (!session.isRevoked()) {
      // Logic Ứng dụng: gọi Repository để thay đổi trạng thái
      await this.userSessionRepository.revokeSession(refreshToken);
    }

    return true; // Trả về thành công
  }
}

module.exports = LogoutUserUseCase;
