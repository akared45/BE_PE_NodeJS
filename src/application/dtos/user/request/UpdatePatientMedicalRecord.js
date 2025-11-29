class UpdatePatientMedicalRecordRequest {
  constructor(body) {
    this.medicalConditions = Array.isArray(body.medicalConditions) 
      ? body.medicalConditions.map(c => ({
          name: c.name?.trim(),
          diagnosedDate: c.diagnosedDate,
          status: c.status || 'under_treatment',
          treatmentPlan: c.treatmentPlan?.trim(),
          notes: c.notes?.trim()
        }))
      : undefined;

    this.allergies = Array.isArray(body.allergies)
      ? body.allergies.map(a => ({
          name: a.name?.trim(),
          severity: a.severity || 'medium',
          reaction: a.reaction?.trim(),
          notes: a.notes?.trim()
        }))
      : undefined;
  }
}

module.exports = UpdatePatientMedicalRecordRequest;