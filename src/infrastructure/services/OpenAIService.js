const { GoogleGenerativeAI } = require("@google/generative-ai");
const IAIService = require("../../application/interfaces/IAIService");
require("dotenv").config();

class GeminiAIService extends IAIService {
  constructor() {
    super();
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async suggestSpecialty(symptoms, availableSpecialties) {
    const specsList = availableSpecialties.map((s) => `${s._id}: ${s.name}`).join(", ");

    const prompt = `
      Bạn là trợ lý y tế. Hãy phân tích triệu chứng: "${symptoms}".
      Chọn 1 chuyên khoa phù hợp nhất từ danh sách: [${specsList}].
      Trả về kết quả CHỈ LÀ MỘT JSON OBJECT (không markdown) với format:
      {
        "code": "Mã chuyên khoa",
        "reason": "Lý do ngắn gọn",
        "isEmergency": true/false
      }
      Nếu không rõ, trả về code "INTERNAL".
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini AI Error:", error);
      return { code: "INTERNAL", reason: "Lỗi kết nối AI", isEmergency: false };
    }
  }
}

module.exports = GeminiAIService;