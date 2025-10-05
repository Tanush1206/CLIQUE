require('dotenv').config();
const mongoose = require('mongoose');
const { connectToDatabase } = require('../src/config/db');
const House = require('../src/models/House');

async function getHouses() {
  try {
    await connectToDatabase();
    const houses = await House.find({}, 'name _id color').lean();
    
    console.log('Current Houses in Database:');
    console.log('--------------------------');
    houses.forEach(house => {
      console.log(`Name: ${house.name}`);
      console.log(`ID:   ${house._id}`);
      console.log(`Color: ${house.color}`);
      console.log('--------------------------');
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error fetching houses:', error);
    process.exit(1);
  }
}

getHouses();
