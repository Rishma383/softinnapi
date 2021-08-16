const express = require("express");
const router = express.Router();
const hotelDetailController = require("../controller/hotelDetails");
const { loginCheck } = require("../middleware/auth");

router.post("/client-name",loginCheck, hotelDetailController.getClientName);
router.post("/hotel-detail",loginCheck, hotelDetailController.getHotelDetail);
router.post("/update-hoteladdress",loginCheck, hotelDetailController.insertUpdateHotelAddress);
// router.post("/delete-hotelAddress",  hotelDetailController.deleteHotelAddress);
module.exports = router;