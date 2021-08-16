const express = require("express");
const router = express.Router();
const itemtypesController = require("../controller/itemtypes");
const { loginCheck } = require("../middleware/auth");

router.post("/all-itemtypes", itemtypesController.getAllItemTypes);
router.post("/create-itemtype", itemtypesController.createItemType);
router.post("/edit-itemtype", itemtypesController.editItemType);
router.post("/update-itemtype", itemtypesController.updateItemType);
router.post("/delete-itemtype", itemtypesController.deleteItemType);

module.exports = router;