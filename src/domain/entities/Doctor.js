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
    
    console.log("\n================ [DEBUG SCHEDULE] ================");
    console.log("1. Input (UTC):", appointmentDate.toISOString());

    // 1. Xác định Thứ (Day)
    const dayName = appointmentDate.toLocaleDateString('en-US', { 
        timeZone: vnTimeZone, 
        weekday: 'long' 
    });
    console.log("2. VN Day Name:", dayName);

    // 2. Tìm lịch
    const schedule = this.schedules.find(s => s.day === dayName);
    console.log("3. Schedule Found:", JSON.stringify(schedule));

    if (!schedule) {
        console.log("=> FAIL: Bác sĩ không làm việc ngày này.");
        return false;
    }

    // 3. Xác định Giờ (Time)
    // Lưu ý: hour12: false để lấy định dạng 24h (09:00, 14:00)
    const options = { timeZone: vnTimeZone, hour12: false, hour: '2-digit', minute: '2-digit' };
    
    const bookingStart = appointmentDate.toLocaleTimeString('en-US', options);
    
    const endDate = new Date(appointmentDate.getTime() + durationMinutes * 60000);
    const bookingEnd = endDate.toLocaleTimeString('en-US', options);

    console.log(`4. Booking Time (VN): ${bookingStart} -> ${bookingEnd}`);
    console.log(`5. Doctor Shift:      ${schedule.start} -> ${schedule.end}`);

    // 4. So sánh String
    // Logic: Giờ đặt >= Giờ bắt đầu ca  VÀ  Giờ xong <= Giờ kết thúc ca
    const isStartOk = bookingStart >= schedule.start;
    const isEndOk = bookingEnd <= schedule.end;

    console.log(`6. Check Start: ${bookingStart} >= ${schedule.start} ? ${isStartOk}`);
    console.log(`7. Check End:   ${bookingEnd} <= ${schedule.end}   ? ${isEndOk}`);

    const result = isStartOk && isEndOk;
    console.log("=> FINAL RESULT:", result);
    console.log("==================================================\n");

    return result;
  }
}

module.exports = Doctor;