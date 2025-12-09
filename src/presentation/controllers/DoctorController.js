const DoctorProfileResponse = require('../../application/dtos/doctor/DoctorProfileResponse');

class DoctorController {
    constructor({ getDoctorListUseCase, getDoctorDetailUseCase, getAvailableSlotsUseCase }) {
        this.getDoctorListUseCase = getDoctorListUseCase;
        this.getDoctorDetailUseCase = getDoctorDetailUseCase;
        this.getAvailableSlotsUseCase = getAvailableSlotsUseCase;
    }
getList = async (req, res, next) => {
    try {
        const doctors = await this.getDoctorListUseCase.execute();
        const response = doctors.map(doc => new DoctorProfileResponse(doc));
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
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
    
    getSlots = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { date } = req.query;
            if (!date) return res.status(400).json({ message: "Date is required" });
            const slots = await this.getAvailableSlotsUseCase.execute({
                doctorId: id,
                date
            });
            res.status(200).json(slots);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = DoctorController;