import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

