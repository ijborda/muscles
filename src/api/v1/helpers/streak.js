const moment = require('moment');

module.exports = class Streak {
  constructor(grid) {
    this.grid = grid;
  }

  getGridArr() {
    let gridArr = [];
    for (let month of Object.keys(this.grid)) {
      gridArr = gridArr.concat(...this.grid[month])
    }
    return gridArr.join('');
  }

  getStreaks() {
    return this.getGridArr().match(/[^0]+/g);
  }

  getLastStreak() {
    return this.getStreaks()[this.getStreaks().length - 1]
  }

  getLongestStreak() {
    let longestStreaklength = Math.max(...this.getStreaks().map(a => a.length))
    let longestStreaks = this.getStreaks().filter(a => a.length === longestStreaklength)
    return longestStreaks[longestStreaks.length - 1];
  }

  getDatesSetFromStreak(streak) {
    let lastStreakIndexStart = this.getGridArr().indexOf(streak);
    let lastStreaklength = streak.length;
    let lastStreakIndexEnd = lastStreakIndexStart + lastStreaklength - 1;
    return [this.indexToDate(lastStreakIndexStart), this.indexToDate(lastStreakIndexEnd)]
  }

  currentStreak() {
    if (!this.getStreaks()) return [0, '', '']
    let isTodayPresent = moment().format("MMM DD YYYY") === this.getDatesSetFromStreak(this.getLastStreak())[1];
    return isTodayPresent ? [this.getLastStreak().length, this.getDatesSetFromStreak(this.getLastStreak())[0], 'Present'] :
                            [0, '', ''];
  }

  longestStreak() {
    if (!this.getStreaks()) return [0, '', '']
    let [start, end] = this.getDatesSetFromStreak(this.getLongestStreak())
    return [this.getLongestStreak().length, start, end ===  moment().format("MMM DD YYYY") ? 'Present' : end]
  }

  totalDays() {
    if (!this.getStreaks()) return [0, '', '']
    let firstDate = this.indexToDate(this.getGridArr().indexOf(this.getStreaks()[0]));
    let lastDate = this.getDatesSetFromStreak(this.getLastStreak())[1];
    return [this.getStreaks().join('').length, firstDate, lastDate];
  }

  indexToDate(ind) {
    return moment().dayOfYear(ind + 1).format("MMM DD YYYY");
  }

}