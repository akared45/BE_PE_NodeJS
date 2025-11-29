class UpdateMyProfile {
  constructor(body) {
    this.fullName = body.fullName?.trim();
    this.dateOfBirth = body.dateOfBirth || undefined;
    this.gender = body.gender || undefined;
    this.avatarUrl = body.avatarUrl || undefined;

    if (Array.isArray(body.contacts)) {
      this.contacts = body.contacts.map(c => ({
        type: c.type || 'phone',
        value: c.value?.trim(),
        isPrimary: !!c.isPrimary
      }));
    }
  }
}

module.exports = UpdateMyProfile;