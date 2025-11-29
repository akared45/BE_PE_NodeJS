class PatientRecord {
  constructor(patient) {
    this.patientId = patient.id.toString();
    this.fullName = patient.profile.fullName;
    this.dateOfBirth = patient.profile.dateOfBirth?.toISOString().split('T')[0] || null;
    this.gender = patient.profile.gender;
    this.avatarUrl = patient.profile.avatarUrl;
    this.primaryPhone = patient.getPrimaryPhone();
    this.medicalConditions = patient.medicalConditions || [];
    this.allergies = patient.allergies || [];
  }
}
module.exports = PatientRecord;