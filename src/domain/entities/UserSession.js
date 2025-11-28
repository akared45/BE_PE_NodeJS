class UserSession {
  constructor({
    userId,
    refreshToken,
    expiresAt,
    revoked = false,
    createdAt = new Date(),
  }) {
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.expiresAt = new Date(expiresAt);
    this.revoked = Boolean(revoked);
    this.createdAt =
      createdAt instanceof Date ? createdAt : new Date(createdAt);
    // Object.freeze(this);
  }

  isRevoked() {
    return this.revoked === true;
  }

  isExpired() {
    return new Date() >= this.expiresAt;
  }

  isValid() {
    return !this.isRevoked() && !this.isExpired();
  }

  revoke() {
    this.revoked = true;
  }
}
module.exports = UserSession;
