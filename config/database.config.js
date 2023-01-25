require("dotenv").config();

module.exports = {
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "Megustaelagua1*",
    database: process.env.DB_NAME || "notas_app",
    port: process.env.DB_PORT || 5432,
  },
};
