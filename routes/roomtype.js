const express = require("express");
const router = express.Router();
const roomtypeController = require("../controller/roomtype");
const { loginCheck } = require("../middleware/auth");

router.post("/all-roomtypes",loginCheck, roomtypeController.getAllRoomTypes);
router.post("/create-roomtypes",loginCheck, roomtypeController.createRoomType);
router.post("/edit-roomtypes", loginCheck,roomtypeController.editRoomType);
router.post("/update-roomtypes",loginCheck, roomtypeController.updateRoomType);
router.post("/delete-roomtypes", loginCheck, roomtypeController.deleteRoomType);

module.exports = router;