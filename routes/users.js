const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");
const { loginCheck } = require("../middleware/auth");

router.get("/all-user",loginCheck, usersController.getAllUser);
router.post("/delete-user", loginCheck, usersController.deleteUser);
router.post("/edit-user", loginCheck, usersController.editUser);
router.post("/update-user", loginCheck, usersController.updateUser);
module.exports = router;