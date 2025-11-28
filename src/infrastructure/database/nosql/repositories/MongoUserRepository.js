const IUserRepository = require("../../../../application/interfaces/IUserRepository");
const UserModel = require("../models/UserModel");
const User = require("../../../../domain/entities/User");

class MongoUserRepository extends IUserRepository {
  constructor() {
    super();
  }

  async findByEmail(email) {
    // Đã có .lean()
    const userDoc = await UserModel.findOne({ email }).lean();
    if (!userDoc) return null;

    return new User({
      id: userDoc.userId,
      username: userDoc.username,
      email: userDoc.email,
      passwordHash: userDoc.passwordHash,
      userType: userDoc.userType,
      isActive: userDoc.isActive,
      createdAt: userDoc.createdAt, // Ánh xạ trực tiếp đối tượng profile để nhất quán và tránh lỗi
      profile: userDoc.profile,
    });
  }

  async save(userEntity) {
    const dataToSave = {
      userId: userEntity.id.value,
      username: userEntity.username,
      email: userEntity.email,
      passwordHash: userEntity.passwordHash,
      userType: userEntity.userType,
      isActive: userEntity.isActive,
      createdAt: userEntity.createdAt,
      profile: userEntity.profile,
    };
    // THÊM .lean() VÀO findOneAndUpdate để nhận về POJO
    const updatedDoc = await UserModel.findOneAndUpdate(
      { userId: userEntity.id.value },
      dataToSave,
      { upsert: true, new: true }
    ).lean(); // <-- BẮT BUỘC ĐỂ TRẢ VỀ POJO

    // ÁNH XẠ TƯỜNG MINH TỪ POJO (updatedDoc)
    return new User({
      id: updatedDoc.userId,
      username: updatedDoc.username,
      email: updatedDoc.email,
      passwordHash: updatedDoc.passwordHash,
      userType: updatedDoc.userType,
      isActive: updatedDoc.isActive,
      createdAt: updatedDoc.createdAt,
      profile: updatedDoc.profile,
    });
  }

  async findById(id) {
    // Đã đúng với .lean()
    const userDoc = await UserModel.findOne({ userId: id }).lean();
    if (!userDoc) return null;

    return new User({
      id: userDoc.userId,
      username: userDoc.username,
      email: userDoc.email,
      passwordHash: userDoc.passwordHash,
      userType: userDoc.userType,
      isActive: userDoc.isActive,
      createdAt: userDoc.createdAt,
      profile: userDoc.profile,
    });
  }
}

module.exports = MongoUserRepository;
