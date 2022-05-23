const jwt = require("jsonwebtoken");

module.exports = {
  getDashboard: (_, res) => {
    res.status(200).render("dashboard", {
      title: "Dashboard",
    });
  },
};
