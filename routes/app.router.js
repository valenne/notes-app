const { router } = require("../config/server.config.js");
const indexController = require("../controller/index.controller.js");
const registerController = require("../controller/register.controller.js");
const loginController = require("../controller/login.controller.js");
const dashboardController = require("../controller/dashboard.controller.js");

const notesController = require("../controller/notes.controller.js");

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
router.get("/note/:id", dashboardController.getEditDashboardNote);

// NOTES
router.get("/notes", notesController.showNotes);
router.post("/note", notesController.addingNote);
router.put("/note", notesController.updateNote);
router.delete("/note/:id", notesController.deleteNote);

module.exports = router;
