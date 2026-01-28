import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // ✅ Required field
  },

  title: String,

  description: String,

  status: {
    type: String,
    enum: ["todo", "in-progress", "finished"],
    default: "todo"
  },

  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium"
  },

  committee: {
    type: String
  },

  dueDate: {
    type: Date
  },

  link: {
    type: String
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    // ✅ NOT required - can be null/undefined
  }

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);