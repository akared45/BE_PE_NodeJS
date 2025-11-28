class IUserRepository {
  //Trả về user nếu tìm thấy
  async findByEmail(email) {
    throw new Error("Method not implemented: FindByEmail");
  }

  async findById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  // Lưu hoặc cập nhật user
  async save(userEntity) {
    throw new Error("Method not implemented: Save");
  }

  // Bổ sung các phương thức khác: finById, updatePassword
}
module.exports = IUserRepository;
