import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['PHOENIX', 'TUSKER', 'LEO', 'KONG'],
    },
    color: {
      type: String,
      required: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Add index for sorting by points
houseSchema.index({ totalPoints: -1 });

const House = mongoose.model('House', houseSchema);

export default House;
