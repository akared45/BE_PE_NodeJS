const Money = require('./Money');

class FeeStructure {
  constructor({ base = 0, increment = 0, level = '', final = 0 }) {
    this.base = new Money(base);
    this.increment = new Money(increment);
    this.level = level?.trim() || '';
    this.final = new Money(final);
    Object.freeze(this);
  }
}
module.exports = FeeStructure;