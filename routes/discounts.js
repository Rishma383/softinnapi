const express = require("express");
const router = express.Router();
const discountsController = require("../controller/discounts");
const { loginCheck } = require("../middleware/auth");

router.post("/all-discounts",loginCheck, discountsController.getAllDiscounts);
router.post("/create-discount",loginCheck, discountsController.createDiscount);
router.post("/edit-discount",loginCheck, discountsController.editDiscount);
router.post("/update-discount",loginCheck, discountsController.updateDiscount);
router.post("/delete-discount",loginCheck, discountsController.deleteDiscount);

module.exports = router;