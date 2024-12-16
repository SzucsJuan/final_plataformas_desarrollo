const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
// const { verifyToken } = require("../middleware/authMiddleware");

router.post('/login', authController.loginUser);
router.post("/register", userController.registerUser);

module.exports = router;
