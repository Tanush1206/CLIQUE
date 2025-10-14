import mongoose from 'mongoose';
import dotenv from 'dotenv';
import House from '../models/House.js';

// Load environment variables
dotenv.config();

const houses = [
  {
    name: 'PHOENIX',
    color: '#fb923c',
    totalPoints: 0,
    description: 'Rise from the ashes',
  },
  {
    name: 'TUSKER',
    color: '#9ca3af',
    totalPoints: 0,
    description: 'Strong and united',
  },
  {
    name: 'LEO',
    color: '#f59e0b',
    totalPoints: 0,
    description: 'Brave and bold',
  },
  {
    name: 'KONG',
    color: '#6b7280',
    totalPoints: 0,
    description: 'Mighty and powerful',
  },
];

const seedHouses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing houses
    await House.deleteMany({});
    console.log('🗑️  Cleared existing houses');

    // Insert houses
    const createdHouses = await House.insertMany(houses);
    console.log('✅ Houses seeded successfully');
    
    // Display house IDs
    console.log('\n📋 House IDs:');
    createdHouses.forEach(house => {
      console.log(`${house.name}: ${house._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding houses:', error);
    process.exit(1);
  }
};

seedHouses();
