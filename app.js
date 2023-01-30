const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const expressFileUopload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const Handlebars = require("handlebars");

//
// const { getNote, updateNote } = require("./db/queries.db.js");
// const { formatDate } = require("./public/js/format.date.js");
//
require("dotenv").config();

// + importing our variables
const { PORT } = require("./config/server.config.js");

// importing routes
const routesController = require("./routes/app.router.js");

/**
 *  App Configuration
 */

// midlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: true }));
app.use(
  expressFileUopload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: `File size is too big (max: 5MB)`,
  })
);
app.use(cookieParser());

// public folder
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/img", express.static(path.join(__dirname, "/public/img")));

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

//helper function what compare two values and return the partial element

Handlebars.registerHelper("equal", function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlebars Helper equal needs 2 parameters");
  if (lvalue != rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

// router.middlewares
app.use(routesController);

app.get("*", (_, res) => {
  res.status(404).render("error/404", {
    title: "404",
  });
});

// server Listening
app.listen(PORT, () => {
  console.log(`Server is running on PORT: http://localhost:${PORT}`);
});
