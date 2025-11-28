const MessageType = Object.freeze({
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file'
});

class Message {
  constructor({ senderId, type = 'text', content = '', fileUrl = null, timestamp = new Date(), read = false }) {
    this.senderId = senderId;
    this.type = Object.values(MessageType).includes(type) ? type : MessageType.TEXT;
    this.content = content?.trim() || '';
    this.fileUrl = fileUrl;
    this.timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
    this.read = Boolean(read);
    Object.freeze(this);
  }
}
Message.Type = MessageType;
module.exports = Message;