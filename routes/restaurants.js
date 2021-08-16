const express = require("express");
const router = express.Router();
const restaurantsController = require("../controller/restaurants");
const { loginCheck } = require("../middleware/auth");

router.post("/all-restaurants", loginCheck,restaurantsController.getAllRestaurants);
router.post("/create-restaurants",loginCheck, restaurantsController.createRestaurants);
router.post("/edit-restaurants",loginCheck, restaurantsController.editRestaurants);
router.post("/update-restaurants",loginCheck, restaurantsController.updateRestaurants);
router.post("/delete-restaurants",loginCheck, restaurantsController.deleteRestaurants);
router.post("/restaurants-detail", restaurantsController.getRestaurantDetail);
module.exports = router;