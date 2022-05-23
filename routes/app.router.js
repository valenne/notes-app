const { router } = require("../config/server.config.js");
const indexController = require("../controller/index.controller.js");
const registerController = require("../controller/register.controller.js");

// INDEX ROUTES
router.get("/", indexController.getIndex);
// REGISTER ROUTES
router.get("/register", registerController.getRegister);
router.post("/register", registerController.postRegister);

module.exports = router;
