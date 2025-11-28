class Money {
  constructor(amount = 0) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw new Error('Money amount must be a non-negative integer (VND)');
    }
    this.amount = amount;
    Object.freeze(this);
  }

  add(other) {
    if (!(other instanceof Money)) throw new Error('Can only add Money');
    return new Money(this.amount + other.amount);
  }

  toNumber() { return this.amount; }
  toString() { return this.amount.toLocaleString('vi-VN'); }

  equals(other) {
    return other instanceof Money && this.amount === other.amount;
  }
}
module.exports = Money;