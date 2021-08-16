const express = require("express");
const router = express.Router();
const menuitemsController = require("../controller/menuitems");
const { loginCheck } = require("../middleware/auth");
const upload = require("../middleware/upload");
const multer = require("multer");

// var storage = multer.diskStorage({
//   storage: multer.memoryStorage(),
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
router.post("/menucode",loginCheck, menuitemsController.getMenuCodeName);
router.post("/all-menuitems", menuitemsController.getAllMenuItems);
router.post("/create-menuitem",loginCheck,upload.any(), menuitemsController.createMenuItem);
router.post("/edit-menuitem",loginCheck, menuitemsController.editMenuItem);
router.post("/update-menuitem",loginCheck,upload.any(), menuitemsController.updateMenuItem);
router.post("/delete-menuitem",loginCheck, menuitemsController.deleteMenuItem);
router.post("/restaurant-menuitems", menuitemsController.getAllMenuItemsByRestaurant);
module.exports = router;