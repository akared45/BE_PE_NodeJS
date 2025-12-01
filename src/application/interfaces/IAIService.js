const { NotImplementedException } = require('../../domain/exceptions');

class IAIService {
    async analyzeSymptoms(chatHistory, patientProfile) {
        throw new NotImplementedException('IAIService.analyzeSymptoms');
    }
}

module.exports = IAIService;