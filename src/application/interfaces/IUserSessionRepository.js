class IUserSessionRepository {
  async save(sessionEntity) {
    throw new Error("Method not implemented: save");
  }

  async findByRefreshToken(token) {
    throw new Error("Method not implemented: findByRefreshToken");
  }
}

module.exports = IUserSessionRepository;
