const mongoose = require('mongoose');

const LeaderboardEntrySchema = new mongoose.Schema(
  {
    houseId: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true, index: true },
    points: { type: Number, required: true },
    reason: { type: String },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
