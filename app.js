const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const exphbs = require("express-handlebars");

require("dotenv").config();

// + importing our variables
const { port } = require("./config.js");

// midlewares
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

app.get("/", (req, res) => {
  res.status(200).render("index", {
    title: "Home",
  });
});

// register

app.get("/register", (req, res) => {
  res.status(200).render("register", {
    title: "Register",
  });
});

// login
app.get("/login", (req, res) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

// server Listening
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
