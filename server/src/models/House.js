const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ['PHOENIX', 'TUSKER', 'LEO', 'KONG'], required: true, unique: true },
    color: { type: String, default: '#38bdf8' },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('House', HouseSchema);
