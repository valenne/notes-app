const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser } = require("../db/queries.db.js");
require("dotenv").config();

module.exports = {
  getLogin: (_, res) => {
    res.status(200).render("login", {
      title: "Login",
    });
  },

  postLogin: async (req, res) => {
    const { email, password } = req.body;

    // find user in db
    const user = await getUser(email);

    if (!user) {
      res.status(401).send({
        message: "Username not found",
        code: 401,
      });
    } else {
      console.log(`first`);
      // verify the password encrypted
      const match = await bcrypt.compare(password, user.password);
      console.log(match);

      if (!match) {
        console.log(`second`);
        res.status(401).send({
          message: "Error password do not match",
          code: 401,
        });
      } else {
        // create the jwt token
        let token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user,
          },
          process.env.SECRET_KEY
        );

        // set cookie data config
        const auth = {
          token: token,
          id: user.id,
          username: user.username,
        };

        let name = `${user.first_name} ${user.last_name}`;

        res.status(200).cookie("auth", auth).send({ name });
      }
    }
  },
};
