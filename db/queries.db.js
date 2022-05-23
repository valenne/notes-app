const { db } = require("../config/database.config.js");
const { Pool } = require("pg");

// instance of the pool
const pool = new Pool(db);

module.exports = {
  newUser: async (firstName, lastName, email, username, password) => {
    try {
      const consult = {
        text: `INSERT INTO users(first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        values: [firstName, lastName, email, username, password],
      };

      let response = await pool.query(consult);

      return response.rows[0];
    } catch (err) {
      console.log({
        error: `Database error, registerUser module`,
        message: `${err}`,
      });
      return null;
    }
  },
};
