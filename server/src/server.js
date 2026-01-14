// import app from "./app.js";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import boardRoutes from "./routes/board.routes.js";
// import taskRoutes from "./routes/task.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import projectRoutes from "./routes/project.routes.js";

// dotenv.config();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB error:", err);
//   });

// // ROUTES FIRST
// app.use("/api/boards", boardRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/projects", projectRoutes);

// // THEN LISTEN
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});