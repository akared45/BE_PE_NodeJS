class UserId {
  constructor(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('UserId must be a non-empty string');
    }
    this.value = value;
    Object.freeze(this);
  }

  equals(other) {
    return other instanceof UserId && this.value === other.value;
  }

  toString() { return this.value; }
}
module.exports = UserId;