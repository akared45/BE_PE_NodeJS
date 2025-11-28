class Specialization {
  constructor({
    code,
    name,
    category,
    baseFee = 0,
    increment = 0,
    feeStructure = {}
  }) {
    this.code = code;
    this.name = name;
    this.category = category;
    this.baseFee = baseFee;
    this.increment = increment;
    this.feeStructure = feeStructure;
    Object.freeze(this);
  }
}
module.exports = Specialization;