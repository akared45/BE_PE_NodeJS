const IUserRepository = require("../../../../domain/repositories/IUserRepository");
const { UserModel, PatientModel, DoctorModel } = require("../models/UserModel");
const User = require("../../../../domain/entities/User");
const Patient = require("../../../../domain/entities/Patient");
const Doctor = require("../../../../domain/entities/Doctor");
const { UserType } = require("../../../../domain/enums");

class MongoUserRepository extends IUserRepository {
    _toDomain(doc) {
        if (!doc) return null;
        const baseData = {
            id: doc._id,
            username: doc.username,
            email: doc.email,
            passwordHash: doc.passwordHash,
            userType: doc.userType,
            isActive: doc.isActive,
            createdAt: doc.createdAt,
            profile: doc.profile,
        };

        switch (doc.userType) {
            case UserType.PATIENT:
                return new Patient({
                    ...baseData,
                    contacts: doc.contacts || [],
                    medicalConditions: doc.medicalConditions || [],
                    allergies: doc.allergies || []
                });

            case UserType.DOCTOR:
                return new Doctor({
                    ...baseData,
                    licenseNumber: doc.licenseNumber,
                    specCode: doc.specCode,
                    fee: doc.fee,
                    qualifications: doc.qualifications || [],
                    workHistory: doc.workHistory || []
                });

            default:
                return new User(baseData);
        }
    }

    _toPersistence(entity) {
        console.log('Entity Type:', entity.constructor.name);
        console.log('Is Patient?', entity.isPatient ? entity.isPatient() : 'Function missing');
        const data = {
            _id: entity.id.toString(),
            username: entity.username,
            email: entity.email,
            passwordHash: entity.passwordHash,
            userType: entity.userType,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            profile: entity.profile,
        };

        if (entity.userType === UserType.PATIENT) {
            data.contacts = entity.contacts;
            data.medicalConditions = entity.medicalConditions;
            data.allergies = entity.allergies;
        }
        else if (entity.userType === UserType.DOCTOR) {
            data.licenseNumber = entity.licenseNumber;
            data.specCode = entity.specCode;
            data.fee = entity.fee;
            data.qualifications = entity.qualifications;
            data.workHistory = entity.workHistory;
        }

        return data;
    }

    async findById(id) {
        const doc = await UserModel.findById(id).lean();
        return this._toDomain(doc);
    }

    async findByEmail(email) {
        const doc = await UserModel.findOne({ email }).lean();
        return this._toDomain(doc);
    }

    async save(userEntity) {
        const data = this._toPersistence(userEntity);
        let ModelToUse = UserModel;
        if (data.userType === UserType.PATIENT) {
            ModelToUse = PatientModel;
        } else if (data.userType === UserType.DOCTOR) {
            ModelToUse = DoctorModel;
        }
        const updatedDoc = await ModelToUse.findByIdAndUpdate(
            data._id,
            data,
            { upsert: true, new: true }
        ).lean();
        return this._toDomain(updatedDoc);
    }

    async delete(id) {
        await UserModel.findByIdAndUpdate(id, { isActive: false });
    }
    async findAllByUserType(userType, options = {}) {
        const { limit = 10, skip = 0 } = options;

        const docs = await UserModel.find({ userType: userType })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
        return docs.map(doc => this._toDomain(doc));
    }
}

module.exports = MongoUserRepository;