const express = require("express");
const router = express.Router();
const cartsController = require("../controller/carts");
const { loginCheck } = require("../middleware/auth");

router.post("/get-cart", cartsController.getCartItems);
router.post("/add-cart", cartsController.addCart);
router.post("/update-cart", cartsController.updateCart);
router.post("/place-order", cartsController.placeOrder);
router.post("/delete-cart", cartsController.deleteCart);
module.exports = router;