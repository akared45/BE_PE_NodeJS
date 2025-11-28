const { NotificationType } = require('../enums');

class Notification {
  constructor({
    id,
    userId,
    type = NotificationType.SYSTEM_ALERT,
    title,
    message,
    read = false,
    createdAt = new Date(),
    expiresAt = null
  }) {
    this.id = id || require('crypto').randomUUID();
    this.userId = userId;
    this.type = type;
    this.title = title;
    this.message = message;
    this.read = Boolean(read);
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.expiresAt = expiresAt ? new Date(expiresAt) : null;
    Object.freeze(this);
  }

  markAsRead() {
    return new Notification({ ...this, read: true });
  }
}
module.exports = Notification;