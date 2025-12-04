class Specialization {
  constructor({ code, name, category }) {
    this.code = code;
    this.name = name;
    this.category = category;
    Object.freeze(this);
  }
}

module.exports = Specialization;