const { router } = require("../config/server.config.js");
const indexController = require("../controller/index.controller.js");
const registerController = require("../controller/register.controller.js");
const loginController = require("../controller/login.controller.js");
const dashboardController = require("../controller/dashboard.controller.js");

// INDEX ROUTES
router.get("/", indexController.getIndex);

// REGISTER ROUTES
router.get("/register", registerController.getRegister);
router.post("/register", registerController.postRegister);

// LOGIN
router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);

// DASHBOARD
router.get("/dashboard", dashboardController.getDashboard);

module.exports = router;
