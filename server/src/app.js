import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";      // ✅ Correct
import userRoutes from "./routes/user.routes.js";      // ✅ Correct
import boardRoutes from "./routes/board.routes.js";    // ✅ Correct
import taskRoutes from "./routes/task.routes.js";      // ✅ Correct
import projectRoutes from "./routes/project.routes.js"; // ✅ Correct

const app = express();

app.use(cors());
app.use(express.json());

// Test route to verify server is working
app.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT!");
  res.json({ message: "Server is working!" });
});

// Register all routes here
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

export default app;