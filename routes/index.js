const router = require("express").Router();

const userRoutes = require("./user-routes");
const productRoutes = require("./product-routes");
const replyRoutes = require("./reply-routes")
router.use("/user", userRoutes);
router.use("/product", productRoutes);
// router.use("/reply", replyRoutes)
module.exports = router;
