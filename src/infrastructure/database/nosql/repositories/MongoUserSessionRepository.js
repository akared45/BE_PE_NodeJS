const IUserSessionRepository = require("../../../../application/interfaces/IUserSessionRepository");
const UserSessionModel = require("../models/UserSessionModel");
const UserSession = require("../../../../domain/entities/UserSession");

class MongoUserSessionRepository extends IUserSessionRepository {
  constructor() {
    super();
  }
  async save(sessionEntity) {
    // 1. Ánh xạ Entity sang Data Dùng để lưu
    const dataToSave = {
      userId: sessionEntity.userId,
      refreshToken: sessionEntity.refreshToken,
      expiresAt: sessionEntity.expiresAt,
      revoked: sessionEntity.revoked,
      createdAt: sessionEntity.createdAt,
    };

    // 2. Thực hiện lưu session mới
    const newDoc = await UserSessionModel.create(dataToSave);

    // 3. Ánh xạ trực tiếp từ Document mới tạo ra Entity
    const docObject = newDoc.toObject();

    return new UserSession({
      userId: docObject.userId,
      refreshToken: docObject.refreshToken,
      expiresAt: docObject.expiresAt,
      revoked: docObject.revoked,
      createdAt: docObject.createdAt,
    });
  }

  // --- Triển khai findByRefreshToken(token) ---
  async findByRefreshToken(token) {
    // 1. Tương tác với DB
    const sessionDoc = await UserSessionModel.findOne({
      refreshToken: token,
    }).lean();

    if (!sessionDoc) return null;

    // 2. Ánh xạ trực tiếp từ Document sang Entity Domain
    return new UserSession({
      userId: sessionDoc.userId,
      refreshToken: sessionDoc.refreshToken,
      expiresAt: sessionDoc.expiresAt,
      revoked: sessionDoc.revoked,
      createdAt: sessionDoc.createdAt,
    });
  }

  // --- Triển khai revokeSession(refreshToken) ---
  async revokeSession(refreshToken) {
    // Logic thu hồi
    const result = await UserSessionModel.updateOne(
      { refreshToken: refreshToken, revoked: false },
      { $set: { revoked: true } }
    );
    return result.modifiedCount > 0;
  }
}

module.exports = MongoUserSessionRepository;
