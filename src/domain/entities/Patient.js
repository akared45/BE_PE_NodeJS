const User = require('./User');
const { Contact, MedicalCondition, Allergy } = require('../value_objects');
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

  _getStringId() {
      if (typeof this.id === 'string') return this.id;
      return this.id.toString(); 
  }

  hasAllergyTo(medName) {
    return this.allergies.some(a => a.name.toLowerCase().includes(medName.toLowerCase()));
  }

  updateProfile(newProfileData) {
    return new Patient({
      ...this,
      id: this._getStringId(),
      profile: {
        ...this.profile,
        ...newProfileData
      }
    });
  }

  updateContactInfo(phone) {
    let newContacts = [...this.contacts];
    if (phone) {
      newContacts = newContacts.filter(c => c.type !== 'phone');
      newContacts.push(new Contact({ type: 'phone', value: phone, isPrimary: true }));
    }

    return new Patient({
      ...this,
      id: this._getStringId(),
      contacts: newContacts
    });
  }

  updateMedicalHistory(medicalConditions, allergies) {
    return new Patient({
      ...this,
      id: this._getStringId(),
      medicalConditions: medicalConditions,
      allergies: allergies
    });
  }
}
module.exports = Patient;