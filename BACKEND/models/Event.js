import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['townhall', 'fest', 'cultural', 'hackathon', 'other'],
    },
    description: {
      type: String,
      required: true,
    },
    statusText: {
      type: String,
      default: '',
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
      default: '',
    },
    // For fest, hackathon, townhall - single registration link
    registrationLink: {
      type: String,
      default: '',
    },
    // For cultural events - house-specific links
    registrationLinksByHouse: {
      PHOENIX: String,
      TUSKER: String,
      LEO: String,
      KONG: String,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Add index for faster queries
eventSchema.index({ category: 1, startAt: -1 });
eventSchema.index({ isPublished: 1, startAt: -1 });
eventSchema.index({ slug: 1 });

// Virtual for status
eventSchema.virtual('status').get(function() {
  const now = new Date();
  if (now < this.startAt) return 'upcoming';
  if (now > this.endAt) return 'past';
  return 'ongoing';
});

// Ensure virtuals are included when converting to JSON
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
