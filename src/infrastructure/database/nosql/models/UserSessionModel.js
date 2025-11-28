const mongoose = require("mongoose");

// Định nghĩa Schema DB cho UserSession
const UserSessionSchema = new mongoose.Schema({
  // Tham chiếu đến ID của người dùng sở hữu session
  userId: {
    type: String,
    required: true,
    index: true,
  },
  // Đây là trường khóa chính và được sử dụng để xác định session
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  // Thời gian session hết hạn (quan trọng cho logic isValid() của Entity)
  expiresAt: {
    type: Date,
    required: true,
  },
  // Trạng thái bị thu hồi (revoked) - dùng cho logout hoặc admin thu hồi
  revoked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// THIẾT LẬP INDEX CHO MONGODB
// 1. Index cho refreshToken: Tối ưu hóa việc tìm kiếm khi người dùng gửi refresh token
UserSessionSchema.index({ refreshToken: 1 });

// 2. TTL (Time-To-Live) Index: Cho phép MongoDB tự động xóa các document hết hạn
// Mục đích: Dọn dẹp các session đã hết hạn để tránh DB bị phình to
// Khi expiresAt < hiện tại, document sẽ bị xóa
UserSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("UserSession", UserSessionSchema);
