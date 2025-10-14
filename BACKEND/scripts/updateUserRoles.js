import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load env variables
dotenv.config();

const updateUserRoles = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ Error: MONGO_URI or MONGODB_URI not found in .env file');
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Find all users without a role field
    const usersWithoutRole = await User.find({ 
      $or: [
        { role: { $exists: false } },
        { role: null }
      ]
    });

    if (usersWithoutRole.length === 0) {
      console.log('✅ All users already have role field set!');
      process.exit(0);
    }

    console.log(`📝 Found ${usersWithoutRole.length} user(s) without role field\n`);

    // Update each user to have role='user' (default)
    for (const user of usersWithoutRole) {
      user.role = 'user';
      await user.save();
      console.log(`✅ Updated: ${user.name} (${user.email}) → role: user`);
    }

    console.log(`\n🎉 Success! Updated ${usersWithoutRole.length} user(s)`);
    console.log('\n💡 Admins need to be set manually using:');
    console.log('   npm run make-admin email@sst.scaler.com\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

updateUserRoles();
