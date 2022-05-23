const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

require("dotenv").config();

// + importing our variables
const { port } = require("./config/server.config.js");

// importing routes
const routesController = require("./routes/app.router.js");

/**
 *  App Configuration
 */

// midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// public folder
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/public/assets"));
app.use(express.static(__dirname + "/public"));

// config handlebars

app.engine(
  "hbs",
  exphbs.engine({
    defaultLaoout: "main",
    layoutDir: `${__dirname}/views/layouts`,
    partialDir: `${__dirname}/views/partials`,
    extname: ".hbs",
    helpers: {
      inc: (value, _) => {
        return parseInt(value) + 1;
      },
    },
  })
);

app.set("view engine", "hbs");

// routes

// router.middlewares
app.use(routesController);

// login
app.get("/login", (req, res) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

app.get("*", (_, res) => {
  res.status(404).render("404", {
    title: "404",
  });
});

// server Listening
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
