const Grid = require('../models/Grid');
const User = require('../models/User');
const Streak = require('../helpers/streak');

module.exports = {
  getDashboard: async (req, res) => {
    try {
      let grid = await Grid.findOne({ user: req.user.id }).lean();
      if (!grid) {
        grid = await Grid.create({
          user: req.user.id,
        });
      }
      const streak = new Streak(grid['2022']);
      const stats = {
        current: streak.currentStreak(),
        longest: streak.longestStreak(),
        total: streak.totalDays(),
      };
      res.render('dashboard.ejs', { grid, profile: req.user, stats });
    } catch (err) {
      console.log(err);
    }
  },

  saveInDb: async (req, res) => {
    try {
      const { day, month, mood } = req.body;
      await Grid.findOneAndUpdate({ user: req.user.id }, {
        $set: {
          [`2022.${month}.${day - 1}`]: mood,
        },
      });
      res.json('Updated');
    } catch (err) {
      console.log(err);
    }
  },

  deleteAccount: async (req, res) => {
    try {
      await Grid.deleteOne({ user: req.user.id });
      await User.deleteOne({ _id: req.user.id });
      res.json('Account deleted');
    } catch (error) {
      console.log(error);
    }
  },
};
