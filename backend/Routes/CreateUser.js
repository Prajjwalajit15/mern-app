const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt  = require("jsonwebtoken");
const bcyrpt = require("bcryptjs");
const jwtSecret = "MyNameIsEndToEndYoutubeChannel$#";

router.post(
  "/creatuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcyrpt.genSalt(10);
    let secPassword = await bcyrpt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const userData = await User.findOne({ email });
      if (!userData) {
        // User not found
        return res.status(400).json({ errors: "Try logging with correct credentials" });
      }

      const pwdCompare = await bcyrpt.compare(req.body.password,userData.password);

      // Check password
      if (!pwdCompare) {
        // Incorrect password
        return res.status(400).json({ errors: "Try logging with correct credentials" });
      }

      const data = {
        user:{
          id : userData.id,
        }
      }
      // Successful login
      const authToken = jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.error("Internal Server Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);


module.exports = router;
