module.exports = {
  getIndex: (_, res) => {
    res.render("index", {
      title: `Home`,
    });
  },
};
