/* eslint-disable no-restricted-syntax */
const moment = require('moment');

module.exports = class Streak {
  constructor(grid) {
    this.grid = grid;
  }

  getGridArr() {
    let gridArr = [];
    for (const month of Object.keys(this.grid)) {
      gridArr = gridArr.concat(...this.grid[month]);
    }
    return gridArr.join('');
  }

  getStreaks() {
    return this.getGridArr().match(/[^0]+/g);
  }

  getLastStreak() {
    return this.getStreaks()[this.getStreaks().length - 1];
  }

  getLongestStreak() {
    const longestStreaklength = Math.max(...this.getStreaks().map((a) => a.length));
    const longestStreaks = this.getStreaks().filter((a) => a.length === longestStreaklength);
    return longestStreaks[longestStreaks.length - 1];
  }

  getDatesSetFromStreak(streak) {
    const lastStreakIndexStart = this.getGridArr().indexOf(streak);
    const lastStreaklength = streak.length;
    const lastStreakIndexEnd = lastStreakIndexStart + lastStreaklength - 1;
    return [Streak.indexToDate(lastStreakIndexStart), Streak.indexToDate(lastStreakIndexEnd)];
  }

  currentStreak() {
    if (!this.getStreaks()) return [0, '', ''];
    const isTodayPresent = moment().format('MMM DD YYYY') === this.getDatesSetFromStreak(this.getLastStreak())[1];
    return isTodayPresent ? [this.getLastStreak().length, this.getDatesSetFromStreak(this.getLastStreak())[0], 'Present'] : [0, '', ''];
  }

  longestStreak() {
    if (!this.getStreaks()) return [0, '', ''];
    const [start, end] = this.getDatesSetFromStreak(this.getLongestStreak());
    return [this.getLongestStreak().length, start, end === moment().format('MMM DD YYYY') ? 'Present' : end];
  }

  totalDays() {
    if (!this.getStreaks()) return [0, '', ''];
    const firstDate = Streak.indexToDate(this.getGridArr().indexOf(this.getStreaks()[0]));
    const lastDate = this.getDatesSetFromStreak(this.getLastStreak())[1];
    return [this.getStreaks().join('').length, firstDate, lastDate];
  }

  static indexToDate(ind) {
    return moment().dayOfYear(ind + 1).format('MMM DD YYYY');
  }
};
