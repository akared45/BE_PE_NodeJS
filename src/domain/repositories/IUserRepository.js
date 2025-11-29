const NotImplementedException = require('../exceptions');

class IUserRepository {
    async save(user) {
        throw new NotImplementedException('save');
    }

    async findByEmail(email) {
        throw new NotImplementedException('findByEmail');
    }

    async findById(id) {
        throw new NotImplementedException('findById');
    }

    async update(user) {
        throw new NotImplementedException('update');
    }
}

module.exports = IUserRepository;