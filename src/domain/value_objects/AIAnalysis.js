class AIAnalysis {
    constructor({ suggestion = '', warning = '', confidence = 0 }) {
        this.suggestion = suggestion;
        this.warning = warning;
        this.confidence = Number(confidence) || 0;
        Object.freeze(this);
    }
}

module.exports = AIAnalysis;