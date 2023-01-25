const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser } = require("../db/queries.db.js");
require("dotenv").config();

// change this time to a more secure one
const timeToExpired = 900;

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
      // verify the password encrypted
      const match = await bcrypt.compare(password, user.password);
      console.log(`password match:`, match);

      if (!match) {
        res.status(401).send({
          message: "Error password do not match",
          code: 401,
        });
      } else {
        // create the jwt token
        let token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + timeToExpired,
            data: user,
          },
          process.env.SECRET_KEY || "your_secret_key"
        );

        // set cookie data config
        const auth = {
          token,
          id: user.id,
          username: user.username,
          email: user.email,
        };

        let name = `${user.first_name} ${user.last_name}`;

        res
          .status(200)
          .cookie("auth", auth, {
            secure: true,
            sameSite: "Strict",
            expires: new Date(Date.now() + timeToExpired * 1000),
          })
          .send({ name });
        console.log(`User was found and logged in`);
      }
    }
  },
};
