class MessageResponse {
  constructor(messageEntity) {
    this.senderId = messageEntity.senderId;
    this.content = messageEntity.content;
    this.type = messageEntity.type;
    this.fileUrl = messageEntity.fileUrl;
    this.timestamp = messageEntity.timestamp;
    this.aiAnalysis = messageEntity.aiAnalysis; 
  }
}
module.exports = MessageResponse;