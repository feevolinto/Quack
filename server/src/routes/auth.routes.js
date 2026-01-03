import express from "express";
import users from "../data/users.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    token: `fake-token-${user.id}`,
  });
});

export default router;
