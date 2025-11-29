class IUserRepositoryPort {
  async findById(id) { throw new Error('Not implemented'); }
  async findByEmail(email) { throw new Error('Not implemented'); }
  async findByRole(role, filters = {}) { throw new Error('Not implemented'); }
  async findMany(criteria = {}, pagination = {}) { throw new Error('Not implemented'); }
  async save(user) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
}

module.exports = IUserRepositoryPort;