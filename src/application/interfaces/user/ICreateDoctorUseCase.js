class ICreateDoctorUseCase {
  async execute(adminUser, dto) {
    throw new Error('Method execute() must be implemented');
  }
}
module.exports = ICreateDoctorUseCase;