class NotImplementedException extends Error {
  constructor(methodName = 'Method') {
    super(`${methodName} is not implemented`);
    this.name = 'NotImplementedException';
    this.statusCode = 500;
    this.code = 'NOT_IMPLEMENTED';
  }
}

module.exports = NotImplementedException;
