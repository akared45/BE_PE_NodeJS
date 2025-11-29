class CreateDoctor {
  constructor(body) {
    this.username = this.required(body.username, 'username');
    this.email = this.required(this.validateEmail(body.email), 'email');
    this.password = body.password?.trim() || '123456';
    this.fullName = this.required(body.fullName?.trim(), 'fullName');
    this.dateOfBirth = body.dateOfBirth || null;
    this.gender = body.gender || 'Other';
    this.avatarUrl = body.avatarUrl || null;
    this.licenseNumber = this.required(body.licenseNumber, 'licenseNumber');
    this.specialization = this.required(body.specialization?.toUpperCase(), 'specialization');
    this.experienceYears = Number(body.experienceYears) || 0;
    this.bio = body.bio?.trim() || '';
    this.baseFee = Number(body.baseFee) || 0;
    this.incrementFee = Number(body.incrementFee) || 0;
    this.schedules = Array.isArray(body.schedules) ? body.schedules : [];
    this.unavailableDates = Array.isArray(body.unavailableDates) ? body.unavailableDates : [];
  }

  required(value, field) {
    if (!value || value.toString().trim() === '') {
      throw new Error(`${field} là bắt buộc`);
    }
    return value;
  }

  validateEmail(email) {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Email không hợp lệ');
    }
    return email.trim().toLowerCase();
  }
}

module.exports = CreateDoctor;