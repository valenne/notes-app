const { db } = require("../config/database.config.js");
const pool = require("../config/db.string.js");

// instance of the pool
// const pool = new Pool(db);

module.exports = {
  newUser: async (firstName, lastName, email, username, password) => {
    console.log({ firstName, lastName, email, username, password });
    try {
      const consult = {
        text: `INSERT INTO users(first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        values: [firstName, lastName, email, username, password],
      };

      let response = await pool.query(consult);

      return response.rows[0];
    } catch (err) {
      console.log({
        error: `Database error, newUser module`,
        message: `${err}`,
      });
      return null;
    }
  },
  getUser: async (email) => {
    try {
      const consult = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log({
        error: `Database error, getUser module`,
        message: `${err}`,
      });
      return null;
    }
  },
  getNotes: async (id) => {
    try {
      const consult = {
        text: `SELECT * FROM tasks WHERE user_id = $1 order by date;`,
        values: [id],
      };

      const response = await pool.query(consult);

      if (response.rows.length === 0) {
        return null;
      } else {
        return response.rows;
      }
    } catch (err) {
      console.log({
        error: `Database error, getNote module`,
        message: `${err}`,
      });
      return null;
    }
  },

  getNote: async (id) => {
    try {
      const consult = {
        text: `SELECT * FROM tasks WHERE id = $1`,
        values: [id],
      };

      const response = await pool.query(consult);
      if (response.rows.length === 0) {
        return null;
      } else {
        return response.rows[0];
      }
    } catch (err) {
      console.log({
        error: `Database error, getNote module`,
        message: `${err}`,
      });
      return null;
    }
  },
  postNote: async (title, content, imageName, date, isCompleted, userId) => {
    try {
      const consult = {
        text: `INSERT INTO tasks(title_task, description, image_task, date, status_task, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        values: [title, content, imageName, date, isCompleted, userId],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log({
        error: `Database error, postNote module`,
        message: `${err}`,
      });
      return null;
    }
  },
  updateNote: async (id, title, content, date, isCompleted) => {
    try {
      const consult = {
        text: `UPDATE tasks SET title_task = $1, description = $2, date = $3, status_task = $4 WHERE id = $5 RETURNING *`,
        values: [title, content, date, isCompleted, id],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log({
        error: `Database error, updateNote module`,
        message: `${err}`,
      });
    }
  },
  deleteNote: async (id) => {
    try {
      const consult = {
        text: `DELETE FROM tasks WHERE id = $1`,
        values: [id],
      };
      const response = await pool.query(consult);
      return response.rowCount;
    } catch (err) {
      console.log({
        error: `Database error, deleteNote module`,
        message: `${err}`,
      });
      return null;
    }
  },
};
