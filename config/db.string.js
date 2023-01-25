const { Pool } = require("pg");

// conection string railway deploy web
const connectionString =
  "postgresql://postgres:OrUhOZm8kb6X4OXFhXgv@containers-us-west-103.railway.app:6398/railway";

const pool = new Pool({
  connectionString,
});

module.exports = pool;
