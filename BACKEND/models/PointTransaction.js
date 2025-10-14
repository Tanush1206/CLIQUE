import mongoose from 'mongoose';

const pointTransactionSchema = new mongoose.Schema(
  {
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
    reason: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['townhall', 'fest', 'cultural', 'hackathon', 'sports', 'academic', 'other'],
      default: 'other',
    },
    awardedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes
pointTransactionSchema.index({ houseId: 1, createdAt: -1 });
pointTransactionSchema.index({ eventId: 1 });
pointTransactionSchema.index({ category: 1 });

const PointTransaction = mongoose.model('PointTransaction', pointTransactionSchema);

export default PointTransaction;
