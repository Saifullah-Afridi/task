const express = require("express");
const { SignUp, logIn } = require("../controllers/authControllers");
const router = express.Router();

router.post("/", SignUp);
router.post("/login", logIn);

module.exports = router;
