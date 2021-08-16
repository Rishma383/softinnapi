const express = require("express");
const router = express.Router();
const roomsController = require("../controller/rooms");
const { loginCheck } = require("../middleware/auth");

router.post("/all-rooms",loginCheck, roomsController.getAllRooms);
router.post("/create-room",loginCheck, roomsController.createRoom);
router.post("/edit-room",loginCheck, roomsController.editRoom);
router.post("/update-room",loginCheck, roomsController.updateRoom);
router.post("/delete-room",loginCheck, roomsController.deleteRoom);

module.exports = router;