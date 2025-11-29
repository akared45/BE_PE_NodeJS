class IListDoctorsUseCase {
  async execute(filters = {}, page = 1, limit = 20) {
    throw new Error('Method execute() must be implemented');
  }
}
module.exports = IListDoctorsUseCase;