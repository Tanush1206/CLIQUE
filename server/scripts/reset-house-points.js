require('dotenv').config();
const mongoose = require('mongoose');
const { connectToDatabase } = require('../src/config/db');

async function resetHousePoints() {
  try {
    await connectToDatabase();
    
    // Reset all house points to 0
    const result = await mongoose.connection.db.collection('houses').updateMany(
      {},
      { $set: { points: 0 } }
    );
    
    console.log(`Reset points for ${result.modifiedCount} houses to 0`);
    
    // Clear all leaderboard entries
    const deleteResult = await mongoose.connection.db.collection('leaderboardentries').deleteMany({});
    console.log(`Removed ${deleteResult.deletedCount} leaderboard entries`);
    
    await mongoose.disconnect();
    console.log('Reset complete!');
  } catch (error) {
    console.error('Error resetting house points:', error);
    process.exit(1);
  }
}

resetHousePoints();
