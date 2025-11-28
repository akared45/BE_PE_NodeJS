const express = require("express");
const { createAuthController } = require("../controllers/AuthController");
const router = express.Router();

const authController = createAuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
