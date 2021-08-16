const express = require("express");
const router = express.Router();
const staffsController = require("../controller/staffs");
const { loginCheck } = require("../middleware/auth");

router.post("/all-staff",loginCheck, staffsController.getAllStaff);
router.post("/creat-staff", loginCheck, staffsController.createStaff);
router.post("/delete-staff", loginCheck, staffsController.deleteStaff);
router.post("/edit-staff", loginCheck, staffsController.editStaff);
router.post("/update-staff", loginCheck, staffsController.updateStaff);
module.exports = router;