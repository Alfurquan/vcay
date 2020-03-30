const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/logout", auth, authController.logoutUser);

router.post("/reset", authController.resetPassword);

router.get("/reset/:token", authController.getNewPassword);

router.post("/password", authController.postNewPassword);

router.get("/checkStatus", auth, authController.checkStatus);

module.exports = router;
