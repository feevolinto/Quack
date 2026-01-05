import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.role !== role) {
      return res.status(401).json({ message: "Role mismatch" });
    }

    res.json({
      message: "Login successful",
      user: {
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
