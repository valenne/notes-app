const jwt = require("jsonwebtoken");
const { getNotes, getNote } = require("../db/queries.db.js");
const { formatDate, formatDateDMY } = require("../public/js/format.date.js");

module.exports = {
  getDashboard: async (req, res) => {
    if (req.cookies.auth === undefined) {
      res.redirect("/login");
    } else {
      const { auth } = req.cookies;
      const { id, username, token } = auth;

      jwt.verify(
        token,
        process.env.SECRET_KEY || "your_secret_key",
        async (err, decoded) => {
          if (err) {
            return res.status(401).render("login", {
              title: `Login`,
            });
          } else {
            // const user = await getUser(email);
            const notes = await getNotes(id);

            if (notes === null) {
              res.status(200).render("dashboard", {
                title: `Dashboard`,
                username,
                notes: notes === null ? [] : notes,
                trigger: { key: true, template: "post" },
              });
            } else {
              // getting just the date of the notes
              notes.forEach((note) => {
                note.date = formatDate(note.date);
              });

              res.status(200).render("dashboard", {
                title: `Dashboard`,
                username,
                notes: notes === null ? [] : notes,
                trigger: { key: true, template: "post" },
              });
            }
          }
        }
      );
    }
  },

  getEditDashboardNote: async (req, res) => {
    if (req.cookies.auth === undefined) {
      res.redirect("/login");
    } else {
      const { id } = req.params;
      const { auth } = req.cookies;
      const { username, token } = auth;

      jwt.verify(
        token,
        process.env.SECRET_KEY || "your_secret_key",
        async (err, decoded) => {
          if (err) {
            res.status(401).render("login", {
              title: `Login`,
            });
          } else {
            console.log("token valid");
            try {
              const notes = await getNote(id);

              // formatting the date
              notes.date = formatDateDMY(notes.date);

              console.log(notes);
              // console.log(note);
              res.status(200).render("dashboard", {
                title: "Update",
                note: notes === null ? [] : notes,
                trigger: { key: true, template: "update" },
                username,
              });
            } catch (err) {
              console.log(`debug: ${err}`);
              res.status(500).send({
                message: "Error",
                error: `${err}`,
              });
            }
          }
        }
      );
    }
  },
};
