class DeactivateUserRequest {
  constructor(data) {
    this.reason = data.reason?.trim() || 'Request from user';
  }
}
module.exports = DeactivateUserRequest;