const express = require("express");
const router = express.Router();
const itemcategoriesController = require("../controller/itemcategories");
const { loginCheck } = require("../middleware/auth");

router.post("/all-itemcategories",loginCheck, itemcategoriesController.getAllItemCategories);
router.post("/create-itemcategory",loginCheck, itemcategoriesController.createItemCategory);
router.post("/edit-itemcategory",loginCheck, itemcategoriesController.editItemCategory);
router.post("/update-itemcategory",loginCheck, itemcategoriesController.updateItemCategory);
router.post("/delete-itemcategory",loginCheck, itemcategoriesController.deleteItemCategory);

module.exports = router;