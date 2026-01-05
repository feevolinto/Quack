import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    await User.create([
      {
        email: "admin@quack.com",
        password: "1234",
        role: "admin"
      },
      {
        email: "member@quack.com",
        password: "1234",
        role: "member"
      }
    ]);

    console.log("Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
