// import express from "express";
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// router.post("/login", async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     if (user.role !== role) {
//       return res.status(401).json({ message: "Role mismatch" });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;

import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("Login attempt:", req.body); // ADD THIS LINE

  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user); // ADD THIS LINE

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      console.log("Password mismatch"); // ADD THIS LINE
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.role !== role) {
      console.log("Role mismatch"); // ADD THIS LINE
      return res.status(401).json({ message: "Role mismatch" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Login successful, token generated"); // ADD THIS LINE

    res.json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error); // ADD THIS LINE
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;