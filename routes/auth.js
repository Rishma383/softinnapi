const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, isAuth, isAdmin } = require("../middleware/auth");

router.post("/isadmin", authController.isAdmin);
router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser);
router.post("/clienttype", authController.postClientType);
router.post("/usertype", authController.postUserType);
router.get("/get-usertype", authController.getUserType);
router.post("/admin/create", authController.postCreateAdmin);

module.exports = router;
