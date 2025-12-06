class SpecializationController {
  constructor({ getAllSpecializationsUseCase }) {
    this.getAllSpecializationsUseCase = getAllSpecializationsUseCase;
  }

  getAll = async (req, res, next) => {
    try {
      const result = await this.getAllSpecializationsUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SpecializationController;