// // import express from "express";
// // import cors from "cors";
// // import authRoutes from "./routes/auth.routes.js";
// // import userRoutes from "./routes/user.routes.js";

// // const app = express();

// // app.use(cors());
// // app.use(express.json());
// // app.use("/api/auth", authRoutes);
// // app.use("/api/users", userRoutes);

// // export default app;

// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import boardRoutes from "./routes/board.routes.js";
// import taskRoutes from "./routes/task.routes.js";
// import projectRoutes from "./routes/project.routes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Register all routes here
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/boards", boardRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/projects", projectRoutes);

// export default app;

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test route to verify server is working
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Register all routes here
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

export default app;