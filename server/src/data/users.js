// const users = [
//   {
//     id: 1,
//     username: "admin",
//     password: "admin123",
//     role: "admin",
//   },
//   {
//     id: 2,
//     username: "user",
//     password: "user123",
//     role: "user",
//   },
// ];

// export default users;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default userSchema;
