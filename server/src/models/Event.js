const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, enum: ['townhall', 'fest', 'cultural', 'hackathon', 'other'], required: true, index: true },
    description: { type: String },
    startAt: { type: Date, index: true },
    endAt: { type: Date },
    location: { type: String },
    bannerUrl: { type: String },
    tags: [{ type: String }],
    // Optional registration link for events with a single form (e.g., fest, hackathon)
    registrationLink: { type: String },
    // Optional per-house registration links (e.g., cultural)
    // Example: { PHOENIX: 'https://...', TUSKER: 'https://...', LEO: 'https://...', KONG: 'https://...' }
    registrationLinksByHouse: { type: Map, of: String },
    isFeatured: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
