module.exports = {
  getIndex: async (req, res) => {
    try {
      res.render('login.ejs');
    } catch (err) {
      console.log(err);
    }
  },
};
