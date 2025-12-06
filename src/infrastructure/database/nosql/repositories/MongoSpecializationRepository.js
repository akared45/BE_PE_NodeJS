const ISpecializationRepository = require('../../../../domain/repositories/ISpecializationRepository');
const SpecializationModel = require('../models/SpecializationModel');

class MongoSpecializationRepository extends ISpecializationRepository {
    async findAll() {
        const docs = await SpecializationModel.find().sort({ name: 1 }).lean();

        return docs.map(doc => ({
            code: doc._id,
            name: doc.name,
            category: doc.category
        }));
    }
}

module.exports = MongoSpecializationRepository;