const IUserRepository = require("../../../../domain/repositories/IUserRepository");
const { UserModel } = require("../models/UserModel");
const UserMapper = require("../mappers/UserMapper");

class MongoUserRepository extends IUserRepository {

    async findById(id) {
        const doc = await UserModel.findById(id).lean();
        return UserMapper.toDomain(doc);
    }

    async findByEmail(email) {
        const doc = await UserModel.findOne({ email }).lean();
        return UserMapper.toDomain(doc);
    }

    async save(userEntity) {
        const dataToSave = UserMapper.toPersistence(userEntity);

        const updatedDoc = await UserModel.findByIdAndUpdate(
            dataToSave._id,
            dataToSave,
            { upsert: true, new: true }
        ).lean();

        return UserMapper.toDomain(updatedDoc);
    }
}

module.exports = MongoUserRepository;