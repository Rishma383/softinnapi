const express = require("express");
const router = express.Router();
const countryStateController = require("../controller/countriesState");
const { loginCheck } = require("../middleware/auth");

router.get("/all-countries", countryStateController.getAllCountry);
router.post("/all-states", countryStateController.getAllStates);
router.post("/insert-country", countryStateController.insertCountry);
router.post("/insert-state", countryStateController.insertState);
module.exports = router;