class UnavailableDate {
  constructor({ date, start = null, end = null, reason = '', allDay = true }) {
    this.date = new Date(date);
    this.start = start ? new Date(`${date.split('T')[0]}T${start}Z`) : null;
    this.end = end ? new Date(`${date.split('T')[0]}T${end}Z`) : null;
    this.reason = reason?.trim() || '';
    this.allDay = Boolean(allDay);
    Object.freeze(this);
  }

  includes(dateToCheck) {
    const d = new Date(dateToCheck);
    if (!this.allDay) {
      return d >= this.start && d <= this.end;
    }
    const dateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const thisDateOnly = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    return dateOnly.getTime() === thisDateOnly.getTime();
  }
}
module.exports = UnavailableDate;