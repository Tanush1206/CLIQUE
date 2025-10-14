import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load env variables
dotenv.config();

const makeAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ Error: MONGO_URI or MONGODB_URI not found in .env file');
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Get email from command line argument or use default
    const email = process.argv[2];

    if (!email) {
      console.error('❌ Error: Please provide an email address');
      console.log('Usage: npm run make-admin your.email@sst.scaler.com');
      process.exit(1);
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      console.log('💡 Make sure the user has logged in at least once via Google OAuth');
      process.exit(1);
    }

    // Check if already admin
    if (user.role === 'admin') {
      console.log(`✅ User ${user.name} (${user.email}) is already an admin`);
      process.exit(0);
    }

    // Update to admin
    user.role = 'admin';
    await user.save();

    console.log('🎉 Success!');
    console.log(`✅ ${user.name} (${user.email}) is now an admin`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

makeAdmin();
