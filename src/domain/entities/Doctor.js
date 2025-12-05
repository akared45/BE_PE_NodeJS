const User = require('./User');
const { Schedule, UnavailableDate } = require('../value_objects');
const { UserType } = require('../enums');

class Doctor extends User {
  constructor(data) {
    super({
      ...data,
      userType: UserType.DOCTOR,
      profile: data.profile
    });
    this.licenseNumber = data.licenseNumber;
    this.specCode = data.specCode;
    this.specializationName = data.specializationName || '';
    this.bio = data.bio?.trim() || '';
    this.qualifications = data.qualifications || [];
    this.workHistory = data.workHistory || [];
    this.yearsExperience = this._calculateYearsExperience();
    this.schedules = (data.schedules || []).map(s => new Schedule(s));
    this.unavailableDates = (data.unavailableDates || []).map(d => new UnavailableDate(d));
    Object.freeze(this);
  }

  _calculateYearsExperience() {
    if (!this.workHistory || this.workHistory.length === 0) {
      return 0;
    }
    let totalMilliseconds = 0;
    const now = new Date();
    this.workHistory.forEach(job => {
      const start = new Date(job.from);
      const end = job.to ? new Date(job.to) : now;
      if (start < end) {
        totalMilliseconds += (end - start);
      }
    });
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor(totalMilliseconds / millisecondsPerYear);
  }

  isAvailableOn(date) {
    const d = new Date(date);
    const dayName = d.toLocaleString('en-US', { weekday: 'long' });
    const hasSchedule = this.schedules.some(s => s.day === dayName);
    const isUnavailable = this.unavailableDates.some(u => u.includes(d));
    return hasSchedule && !isUnavailable;
  }

  isWorkingAt(appointmentDate, durationMinutes) {
    const vnTimeZone = 'Asia/Ho_Chi_Minh';
    const dayName = appointmentDate.toLocaleDateString('en-US', {
      timeZone: vnTimeZone,
      weekday: 'long'
    });
    const schedule = this.schedules.find(s => s.day === dayName);

    if (!schedule) {
      return false;
    }
    const options = { timeZone: vnTimeZone, hour12: false, hour: '2-digit', minute: '2-digit' };
    const bookingStart = appointmentDate.toLocaleTimeString('en-US', options);
    const endDate = new Date(appointmentDate.getTime() + durationMinutes * 60000);
    const bookingEnd = endDate.toLocaleTimeString('en-US', options);
    const isStartOk = bookingStart >= schedule.start;
    const isEndOk = bookingEnd <= schedule.end;
    const result = isStartOk && isEndOk;

    return result;
  }

  updateDetails(data) {
    return new Doctor({
      ...this,
      id: this.id.value || this.id.toString(),
      isActive: data.isActive !== undefined ? data.isActive : this.isActive,
      licenseNumber: data.licenseNumber || this.licenseNumber,
      specCode: data.specCode || this.specCode,
      bio: data.bio || this.bio,
      fee: data.fee || this.fee,
      qualifications: data.qualifications || this.qualifications,
      workHistory: data.workHistory || this.workHistory,
      profile: {
        ...this.profile,
        fullName: data.fullName || this.profile.fullName,
        avatarUrl: data.avatarUrl || this.profile.avatarUrl
      }
    });
  }

}

module.exports = Doctor;