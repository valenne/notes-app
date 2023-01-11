require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8070,

  jwtSecret: process.env.JWT_SECRET,

  router: require("express").Router(),
};
