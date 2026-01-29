import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    // Hash passwords before creating users
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("1234", salt);

    await User.create([
      {
        email: "admin@quack.com",
        password: hashedPassword,
        role: "admin"
      },
      {
        email: "member@quack.com",
        password: hashedPassword,
        role: "member"
      },
      {
        email: "feevol@quack.com",  // Your new user
        password: hashedPassword,
        role: "admin"  // or "admin"
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