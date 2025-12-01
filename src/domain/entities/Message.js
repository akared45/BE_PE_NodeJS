const AIAnalysis = require('../value_objects/AIAnalysis');

const MessageType = Object.freeze({
    TEXT: 'text',
    IMAGE: 'image',
    FILE: 'file'
});

class Message {
    constructor({
        senderId,
        content = '',
        type = 'text',
        fileUrl = null,
        timestamp = new Date(),
        isRead = false,
        aiAnalysis = null
    }) {
        if (!senderId) throw new Error("Message must have a senderId");
        if (type === MessageType.TEXT && !content && !fileUrl) {
            throw new Error("Message content is required");
        }

        this.senderId = senderId;
        this.content = content ? content.trim() : '';
        this.type = Object.values(MessageType).includes(type) ? type : MessageType.TEXT;
        this.fileUrl = fileUrl;
        this.timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
        this.isRead = Boolean(isRead);
        this.aiAnalysis = aiAnalysis ? new AIAnalysis(aiAnalysis) : null;
        Object.freeze(this);
    }
}

Message.Type = MessageType;
module.exports = Message;