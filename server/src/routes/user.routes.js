// import express from "express";
// import { requireAuth } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/me", requireAuth, (req, res) => {
//   res.json({
//     message: "Protected route accessed",
//     user: req.user,
//   });
// });

// export default router;

import express from "express";
import User from "../data/users.js"; // Import User schema
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// ===== Register =====
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully ✅", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ===== Login =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found ❌" });

    // Check password (later, replace with bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password ❌" });
    }

    res.status(200).json({ message: `Welcome back, ${user.name} ✅`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ===== Protected route =====
router.get("/me", requireAuth, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

export default router;
