const express = require("express");
const router = express.Router();
const kitchensController = require("../controller/kitchens");
const { loginCheck } = require("../middleware/auth");

router.post("/all-kitchens",loginCheck, kitchensController.getAllKitchens);
router.post("/create-kitchen",loginCheck, kitchensController.createKitchen);
router.post("/edit-kitchen",loginCheck, kitchensController.editKitchen);
router.post("/update-kitchen",loginCheck, kitchensController.updateKitchen);
router.post("/delete-kitchen",loginCheck, kitchensController.deleteKitchen);

module.exports = router;