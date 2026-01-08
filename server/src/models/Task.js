import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,

  status: {
    type: String,
    enum: ["todo", "in-progress", "finished"],
    default: "todo"
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
  }

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
