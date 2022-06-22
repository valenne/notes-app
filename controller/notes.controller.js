const jwt = require("jsonwebtoken");
const {
  getNotes,
  getNote,
  postNote,
  updateNote,
  deleteNote,
} = require("../db/queries.db.js");
const fs = require("fs");

module.exports = {
  showNotes: async () => {
    const { auth } = req.cookies;
    const { id } = auth;

    const notes = await getNotes(id);

    // find the image on the server and send it to the client

    console.log(`Estas son las notas del usuarios`, notes);

    res.status(200).render("dashboard", {
      title: `Dashboard`,
      username,
      trigger: { key: true, template: "show-notes" },
    });
  },

  addingNote: async (req, res) => {
    const images = req.files;
    const { title, content, date } = req.body;
    let imageName = "";
    const { username } = req.cookies.auth;

    if (images) {
      if (
        images.image.mimetype === "image/jpeg" ||
        images.image.mimetype === "image/png"
      ) {
        imageName = images.image.name;
        images.image.mv(`public/uploads/${imageName}`);
        console.log(`img was uploaded`);
      } else {
        res.status(400).json({ message: "Invalid image format" });
      }
    } else {
      imageName = null;
    }

    try {
      const note = await postNote(
        title,
        content,
        imageName,
        date,
        false,
        req.cookies.auth.id
      );

      res.status(200).render("dashboard", {
        title: `Dashboard`,
        username,
        key: "dashboard",
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateNote: async (req, res) => {
    const { id, title, content, date, isCompleted } = req.body;

    try {
      const updated = await updateNote(id, title, content, date, isCompleted);
      res.status(200).send(updated);
    } catch (err) {
      res.status(401).render("/login", {
        title: "Login",
      });
    }
  },
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await getNote(id);

      const response = await deleteNote(id);

      if (response > 0) {
        // deleting the image from public/uploads

        if (note.image_task === null) {
          console.log(`the task have not image to delete`);
        } else {
          fs.unlink(`public/uploads/${note.image_task}`, (err) => {
            if (err) throw err;
            console.log(`Image was deleted`);
          });
        }
        res.status(200).json({ message: "Note deleted" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (err) {
      res.status(500).send({
        error: "Error failed to delete note",
        message: `${err}`,
      });
    }
  },
};
