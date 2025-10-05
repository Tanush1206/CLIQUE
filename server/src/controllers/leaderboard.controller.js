const LeaderboardEntry = require('../models/LeaderboardEntry');
const House = require('../models/House');

exports.getLeaderboard = async (req, res, next) => {
  try {
    // First, ensure all houses exist in the response with zero points
    const allHouses = await House.find({}, 'name color');
    
    // Get aggregated points from LeaderboardEntry
    const agg = await LeaderboardEntry.aggregate([
      { $group: { _id: '$houseId', points: { $sum: '$points' } } },
      { $lookup: { from: 'houses', localField: '_id', foreignField: '_id', as: 'house' } },
      { $unwind: '$house' },
      { 
        $project: { 
          _id: 0, 
          houseId: '$house._id', 
          name: '$house.name', 
          color: '$house.color', 
          points: 1 
        } 
      }
    ]);

    // Create a map of houseId to points for easy lookup
    const pointsMap = new Map(agg.map(item => [item.houseId.toString(), item.points]));

    // Merge with all houses to ensure all are included
    const result = allHouses.map(house => ({
      houseId: house._id,
      name: house.name,
      color: house.color,
      points: pointsMap.get(house._id.toString()) || 0
    }));

    // Sort by points descending
    result.sort((a, b) => b.points - a.points);
    
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};

exports.awardPoints = async (req, res, next) => {
  console.log('Awarding points with data:', req.body);
  try {
    const { houseId, points, reason, eventId } = req.body;
    
    // Input validation
    if (!houseId || typeof points !== 'number') {
      console.error('Validation failed:', { houseId, points });
      return res.status(400).json({ error: 'house ID and numeric points are required' });
    }
    
    // Find house by ID
    const house = await House.findById(houseId);
    
    if (!house) {
      return res.status(400).json({ error: `House with ID '${houseId}' not found` });
    }

    console.log('Creating leaderboard entry...');
    const entry = await LeaderboardEntry.create({ 
      houseId: house._id, 
      points, 
      reason, 
      eventId,
      createdAt: new Date()
    });
    console.log('Leaderboard entry created:', entry);

    console.log('Updating house points...');
    const updatedHouse = await House.findByIdAndUpdate(
      house._id, 
      { $inc: { points } },
      { new: true }
    );
    console.log('House updated:', updatedHouse);
    
    // Get updated leaderboard
    const leaderboard = await getLeaderboardForResponse();
    
    res.status(201).json({ 
      success: true,
      entry,
      updatedHouse,
      leaderboard: { data: leaderboard } // Match the format of getLeaderboard
    });
  } catch (err) {
    console.error('Error in awardPoints:', err);
    next(err);
  }
};

// Helper function to get leaderboard data
const getLeaderboardForResponse = async () => {
  try {
    const allHouses = await House.find({}, 'name color');
    console.log('All houses:', allHouses);
    
    const agg = await LeaderboardEntry.aggregate([
      { $group: { _id: '$houseId', points: { $sum: '$points' } } },
      { $lookup: { from: 'houses', localField: '_id', foreignField: '_id', as: 'house' } },
      { $unwind: '$house' },
      { 
        $project: { 
          _id: 0, 
          houseId: '$house._id', 
          name: '$house.name', 
          color: '$house.color', 
          points: 1 
        } 
      }
    ]);
    
    console.log('Aggregation result:', JSON.stringify(agg, null, 2));

    const pointsMap = new Map(agg.map(item => [item.houseId.toString(), item.points]));
    const result = allHouses.map(house => ({
      houseId: house._id,
      name: house.name,
      color: house.color,
      points: pointsMap.get(house._id.toString()) || 0
    }));

    console.log('Final leaderboard result:', result);
    return result.sort((a, b) => b.points - a.points);
  } catch (error) {
    console.error('Error in getLeaderboardForResponse:', error);
    throw error;
  }
};

// Export the function so it can be used in awardPoints
exports.getLeaderboardForResponse = getLeaderboardForResponse;
