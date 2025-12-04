const DoctorProfileResponse = require('../../application/dtos/doctor/DoctorProfileResponse');

class DoctorController {
    constructor({ getDoctorListUseCase, getDoctorDetailUseCase }) {
        this.getDoctorListUseCase = getDoctorListUseCase;
        this.getDoctorDetailUseCase = getDoctorDetailUseCase;
    }

    getList = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            const doctors = await this.getDoctorListUseCase.execute({
                options: {
                    limit: Number(limit) || 10,
                    skip: Number(skip) || 0
                }
            });
            const response = doctors.map(doc => new DoctorProfileResponse(doc));
            res.status(200).json(response);
        } catch (error) { next(error); }
    };

    getDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const doctorEntity = await this.getDoctorDetailUseCase.execute(id);
            const response = new DoctorProfileResponse(doctorEntity);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = DoctorController;