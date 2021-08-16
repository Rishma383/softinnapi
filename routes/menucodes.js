const express = require("express");
const router = express.Router();
const menucodesController = require("../controller/menucodes");
const { loginCheck } = require("../middleware/auth");

router.post("/all-menucodes",loginCheck, menucodesController.getAllMenuCodes);
router.post("/create-menucode",loginCheck, menucodesController.createMenuCode);
router.post("/edit-menucode",loginCheck, menucodesController.editMenuCode);
router.post("/update-menucode",loginCheck, menucodesController.updateMenuCode);
router.post("/delete-menucode",loginCheck, menucodesController.deleteMenuCode);

module.exports = router;