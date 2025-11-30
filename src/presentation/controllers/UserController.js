const UpdatePatientRequest = require('../../application/dtos/patient/UpdatePatientRequest');
const PatientProfileResponse = require('../../application/dtos/patient/PatientProfileResponse');
const DoctorProfileResponse = require('../../application/dtos/doctor/DoctorProfileResponse');

class UserController {
    constructor({ getUserProfileUseCase, getUserListUseCase, updatePatientProfileUseCase }) {
        this.getUserProfileUseCase = getUserProfileUseCase;
        this.getUserListUseCase = getUserListUseCase;
        this.updatePatientProfileUseCase = updatePatientProfileUseCase;
    }

    getProfile = async (req, res, next) => {
        try {
            const targetId = req.params.id === 'me' ? req.user.id : req.params.id;

            const entity = await this.getUserProfileUseCase.execute({
                currentUserId: req.user.id,
                targetUserId: targetId
            });
            let response;
            if (entity.isDoctor()) response = new DoctorProfileResponse(entity);
            else response = new PatientProfileResponse(entity);

            res.status(200).json(response);
        } catch (error) { next(error); }
    };

    getList = async (req, res, next) => {
        try {
            const { type, limit, skip } = req.query;
            const users = await this.getUserListUseCase.execute({
                currentUserId: req.user.id,
                typeToList: type,
                options: { limit: Number(limit) || 10, skip: Number(skip) || 0 }
            });
            const response = users.map(u => u.isDoctor() ? new DoctorProfileResponse(u) : new PatientProfileResponse(u));
            res.status(200).json(response);
        } catch (error) { next(error); }
    };

    updatePatientProfile = async (req, res, next) => {
        try {
            const requestDto = new UpdatePatientRequest({
                currentUserId: req.user.id,
                targetPatientId: req.user.id,
                ...req.body
            });
            const result = await this.updatePatientProfileUseCase.execute(requestDto);
            res.status(200).json(result);
        } catch (error) { next(error); }
    }
}

module.exports = UserController;