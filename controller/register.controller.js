// importin db function
const bcrypt = require("bcrypt");
const { newUser } = require("../db/queries.db.js");

module.exports = {
  getRegister: (_, res) => {
    res.render("register", {
      title: `Registro`,
    });
  },
  postRegister: async (req, res) => {
    const { name, lastname, email, username, password } = req.body;

    try {
      let passHash = await bcrypt.hash(password, 10);

      const data = await newUser(name, lastname, email, username, passHash);

      if (data == null) {
        res.status(500).send(data);
      } else {
        res.status(200).send(data);
      }
    } catch (err) {
      res.status(500).send({
        error: "Error failed to register user",
        message: `${err}`,
        code: 500,
      });
    }
  },
};
