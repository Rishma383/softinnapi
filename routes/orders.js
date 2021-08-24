const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");
const { loginCheck } = require("../middleware/auth");

router.get("/show-order", ordersController.getOrdersInKitchen);
module.exports = router;