import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Load env variables
dotenv.config();

const getToken = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ Error: MONGO_URI or MONGODB_URI not found in .env file');
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Get email from command line argument
    const email = process.argv[2];

    if (!email) {
      console.error('❌ Error: Please provide an email address');
      console.log('Usage: npm run get-token your.email@sst.scaler.com');
      process.exit(1);
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      console.log('💡 Make sure the user has logged in at least once via Google OAuth');
      process.exit(1);
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('\n🎉 JWT Token Generated!\n');
    console.log('📋 User Details:');
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role || 'user'}`);
    console.log(`   ID: ${user._id}`);
    console.log('\n🔑 Your JWT Token (copy this):');
    console.log('━'.repeat(80));
    console.log(token);
    console.log('━'.repeat(80));
    console.log('\n📝 How to use in Postman:');
    console.log('   1. Open Postman');
    console.log('   2. Go to Authorization tab');
    console.log('   3. Select Type: Bearer Token');
    console.log('   4. Paste the token above');
    console.log('\n⏰ Token expires in: 30 days\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

getToken();
