require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8070,

  router: require("express").Router(),
};
