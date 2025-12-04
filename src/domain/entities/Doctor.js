const User = require('./User');
const { FeeStructure, Schedule, UnavailableDate } = require('../value_objects');
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
    this.yearsExperience = Number(data.yearsExperience) || 0;
    this.rating = Number(data.rating) || 0;
    this.reviewCount = Number(data.reviewCount) || 0;
    this.bio = data.bio?.trim() || '';
    this.fee = new FeeStructure(data.fee || { base: 0, increment: 0, level: '', final: 0 });
    this.qualifications = data.qualifications || [];
    this.workHistory = data.workHistory || [];
    this.schedules = (data.schedules || []).map(s => new Schedule(s));
    this.unavailableDates = (data.unavailableDates || []).map(d => new UnavailableDate(d));
    Object.freeze(this);
  }

  isAvailableOn(date) {
    const d = new Date(date);
    const dayName = d.toLocaleString('en-US', { weekday: 'long' });
    const hasSchedule = this.schedules.some(s => s.day === dayName);
    const isUnavailable = this.unavailableDates.some(u => u.includes(d));
    return hasSchedule && !isUnavailable;
  }

  isWorkingAt(appointmentDate, durationMinutes) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[appointmentDate.getDay()];
    const schedule = this.schedules.find(s => s.day === dayName);
    if (!schedule) return false;
    const bookingStart = appointmentDate.toTimeString().slice(0, 5);
    const endDate = new Date(appointmentDate.getTime() + durationMinutes * 60000);
    const bookingEnd = endDate.toTimeString().slice(0, 5);
    return bookingStart >= schedule.start && bookingEnd <= schedule.end;
  }
}
module.exports = Doctor;