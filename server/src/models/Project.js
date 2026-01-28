import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  date: {
    type: Date
  },

  location: {
    type: String
  },

  leader: {
    type: String
  },

  committee: {
    type: String
  },

  status: {
    type: String,
    enum: ["active", "inactive", "finished", "archived", "trashed"],
    default: "active"
  },

  // New field to track when project was archived
  archivedAt: {
    type: Date
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);