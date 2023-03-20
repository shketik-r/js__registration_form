export class Birth {
  day = 1;
  month = 1;
  year = 1980;

  setDay(day) {
    this.day = day;
  }
  setMonth(month) {
    this.month = month;
  }
  setYear(year) {
    this.year = year;
  }

  #counterDay() {
    let date = new Date(this.year, this.month, 0);
    return date.getDate();
  }
  getNumberOfDays() {
    return this.#counterDay();
  }
  getDay() {
    return this.day;
  }
  getMonth() {
    return this.month;
  }
  getYaer() {
    return this.year;
  }
}
