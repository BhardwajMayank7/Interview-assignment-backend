const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  uploadUserProfilePhoto,
  updateUserProfile,
} = require("../controllers/userController.js");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", getUserProfile);

router.put("/profile", updateUserProfile);

router.post("/profile/photo", uploadUserProfilePhoto);

module.exports = router;
