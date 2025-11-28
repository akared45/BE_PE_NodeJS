const User = require("../../domain/entities/User");
const RegisterOutputDTO = require("../dtos/RegisterOutputDTO");

class RegisterUserUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(data) {
    console.log("LOG-1: Bắt đầu tìm User.");
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("UserRegistrationFailed: Email is already in use.");
    }
    console.log("LOG-2: Đã kiểm tra User.");
    const passwordHash = await this.authService.hashPassword(data.password);
    console.log("LOG-3: Đã Hash Mật khẩu.");
    const newUser = new User({
      username: data.username,
      email: data.email,
      passwordHash: passwordHash,
      userType: data.userType,
      profile: data.profile,
    });
    console.log("LOG-4: Đã tạo Entity User.");

    await this.userRepository.save(newUser);
    console.log("LOG-5: Đã Lưu User.");

    return new RegisterOutputDTO(newUser);
  }
}

module.exports = RegisterUserUseCase;
