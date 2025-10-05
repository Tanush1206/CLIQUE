require('dotenv').config();
const mongoose = require('mongoose');
const { connectToDatabase } = require('../src/config/db');
const Event = require('../src/models/Event');

async function getEvents() {
  try {
    await connectToDatabase();
    const events = await Event.find({}, 'title _id startAt endAt category').sort({ startAt: 1 }).lean();
    
    console.log('Current Events in Database:');
    console.log('--------------------------');
    events.forEach(event => {
      console.log(`Title: ${event.title}`);
      console.log(`ID:     ${event._id}`);
      console.log(`When:   ${new Date(event.startAt).toLocaleString()} - ${new Date(event.endAt).toLocaleString()}`);
      console.log(`Type:   ${event.category.toUpperCase()}`);
      console.log('--------------------------');
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error fetching events:', error);
    process.exit(1);
  }
}

getEvents();
