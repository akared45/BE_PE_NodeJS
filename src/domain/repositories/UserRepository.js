const NotImplementedException = require('../exceptions')

class UserRepository {
    async findById(id) {
        throw new NotImplementedException('findById');
    }

    async findByEmail(email) {
        throw new NotImplementedException('findByEmail');
    }

    async findByRole(role) {
        throw new NotImplementedException('findByRole');
    }

    async save(user) {
        throw new NotImplementedException('save');
    }

    async delete(id) {
        throw new NotImplementedException('delete');
    }
}
module.exports = UserRepository;