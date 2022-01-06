const router = require("express").Router();

const { auth } = require("../middlewares/auth-middleware.js");
const checkPermission = require("../middlewares/check-permission.js");
const checkRole = require("../middlewares/check-role.js");
const { Problem } = require("../models/index.js");
const ProblemController = require("./../controllers/problem-controller.js");

router.post("/create", auth, ProblemController.create);
router.get("/", ProblemController.getAll);
router.delete('/:id', auth, checkRole("ADMIN", "USER"), checkPermission(Problem), ProblemController.deleteOne)
module.exports = router;
