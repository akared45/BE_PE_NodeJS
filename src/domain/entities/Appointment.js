const { AppointmentStatus, AppointmentType } = require("../enums");
const {
  Money,
  SymptomDetail,
  Prescription,
  Message,
} = require("../value_objects");

class Appointment {
  constructor({
    id,
    patientId,
    doctorId,
    type = AppointmentType.VIDEO,
    appointmentDate,
    durationMinutes = 30,
    status = AppointmentStatus.PENDING,
    calculatedFee = 0,
    symptoms = "",
    doctorNotes = "",
    createdAt = new Date(),
    symptomDetails = [],
    prescriptions = [],
    messages = [],
  }) {
    this.id = id || require("crypto").randomUUID();
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.type = type;
    this.appointmentDate = new Date(appointmentDate);
    this.durationMinutes = Number(durationMinutes);
    this.status = status;
    this.calculatedFee = new Money(calculatedFee);
    this.symptoms = symptoms?.trim() || "";
    this.doctorNotes = doctorNotes?.trim() || "";
    this.createdAt =
      createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.symptomDetails = symptomDetails.map((s) => new SymptomDetail(s));
    this.prescriptions = prescriptions.map((p) => new Prescription(p));
    this.messages = messages.map((m) => new Message(m));
  }

  complete(notes = "", prescriptions = []) {
    return new Appointment({
      ...this,
      status: AppointmentStatus.COMPLETED,
      doctorNotes: notes,
      prescriptions: prescriptions.map((p) => new Prescription(p)),
    });
  }

  cancel() {
    return new Appointment({ ...this, status: AppointmentStatus.CANCELLED });
  }

  addMessage(senderId, content, type = "text", fileUrl = null) {
    const newMsg = new Message({
      senderId,
      type,
      content,
      fileUrl,
      timestamp: new Date(),
    });
    return new Appointment({
      ...this,
      messages: [...this.messages, newMsg],
    });
  }
}
module.exports = Appointment;
