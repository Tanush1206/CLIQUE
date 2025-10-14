import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load env variables
dotenv.config();

const listUsers = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ Error: MONGO_URI or MONGODB_URI not found in .env file');
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Get all users
    const users = await User.find({}).select('name email role googleId');

    if (users.length === 0) {
      console.log('📝 No users found in database');
      process.exit(0);
    }

    console.log(`📋 Total Users: ${users.length}\n`);
    console.log('━'.repeat(80));
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role || '(not set)'}`);
      console.log(`   ID: ${user._id}`);
      console.log('━'.repeat(80));
    });

    const adminCount = users.filter(u => u.role === 'admin').length;
    const userCount = users.filter(u => u.role === 'user').length;
    const noRoleCount = users.filter(u => !u.role).length;

    console.log(`\n📊 Summary:`);
    console.log(`   Admins: ${adminCount}`);
    console.log(`   Users: ${userCount}`);
    console.log(`   No role set: ${noRoleCount}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

listUsers();
