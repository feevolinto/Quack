// scripts/hashPasswords.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const hashExistingPasswords = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const users = await User.find({});
  
  for (const user of users) {
    // Check if password is already hashed (bcrypt hashes start with $2)
    if (!user.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      console.log(`✅ Hashed password for ${user.email}`);
    }
  }
  
  console.log('✅ All passwords hashed');
  process.exit(0);
};

hashExistingPasswords();