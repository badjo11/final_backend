const router = require("express").Router();

const userRoutes = require("./user-routes");
const problemRoutes = require("./problem-routes");
const replyRoutes = require("./reply-routes")
router.use("/user", userRoutes);
router.use("/problem", problemRoutes);
// router.use("/reply", replyRoutes)
module.exports = router;
