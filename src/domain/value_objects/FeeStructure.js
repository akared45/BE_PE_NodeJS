const Money = require('./Money');

class FeeStructure {
  constructor({ base = 0, increment = 0, level = '', final = 0 }) {
    this.base = new Money(Number(base));
    this.increment = new Money(Number(increment));
    this.level = level?.trim() || '';
     this.final = new Money(Number(final));
    Object.freeze(this);
  }
}
module.exports = FeeStructure;