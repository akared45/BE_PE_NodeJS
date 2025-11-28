const User = require('./User');
const { Contact, MedicalCondition, Allergy } = require('../value-objects');
const { UserType } = require('../enums');

class Patient extends User {
  constructor(data) {
    super({
      ...data,
      userType: UserType.PATIENT,
      profile: data.profile
    });
    this.contacts = (data.contacts || []).map(c => new Contact(c));
    this.medicalConditions = (data.medicalConditions || []).map(m => new MedicalCondition(m));
    this.allergies = (data.allergies || []).map(a => new Allergy(a));
    Object.freeze(this);
  }
  getPrimaryPhone() {
    return this.contacts.find(c => c.type === 'phone' && c.isPrimary)?.value || null;
  }
  hasAllergyTo(medName) {
    return this.allergies.some(a => a.name.toLowerCase().includes(medName.toLowerCase()));
  }
}
module.exports = Patient;