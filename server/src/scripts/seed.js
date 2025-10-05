/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { connectToDatabase } = require('../config/db');
const House = require('../models/House');
const Event = require('../models/Event');
const LeaderboardEntry = require('../models/LeaderboardEntry');

async function run() {
  await connectToDatabase();

  // Upsert houses
  const houses = [
    { name: 'PHOENIX', color: '#fb923c' },
    { name: 'TUSKER', color: '#9ca3af' },
    { name: 'LEO', color: '#f59e0b' },
    { name: 'KONG', color: '#6b7280' },
  ];
  for (const h of houses) {
    await House.updateOne({ name: h.name }, { $set: h, $setOnInsert: { points: 0 } }, { upsert: true });
  }

  // Sample events
  const now = new Date();
  const sampleEvents = [
    {
      title: 'Monthly Townhall — October',
      slug: 'monthly-townhall-oct',
      category: 'townhall',
      description: 'Company updates and Q&A',
      startAt: now,
      endAt: new Date(now.getTime() + 90 * 60000),
      location: 'Auditorium',
      bannerUrl: '',
      tags: ['monthly', 'all-hands'],
      isFeatured: true,
      isPublished: true,
    },
    {
      title: 'Annual Fest — Day 1',
      slug: 'annual-fest-day-1',
      category: 'fest',
      description: 'Fun, music, and celebrations',
      startAt: new Date(now.getTime() + 24 * 3600 * 1000),
      endAt: new Date(now.getTime() + 26 * 3600 * 1000),
      location: 'Main Ground',
      bannerUrl: '',
      tags: ['festival'],
      isFeatured: false,
      isPublished: true,
    },
    {
      title: 'Cultural Night — Performances',
      slug: 'cultural-night-performances',
      category: 'cultural',
      description: 'Dance, music, drama',
      startAt: new Date(now.getTime() + 48 * 3600 * 1000),
      endAt: new Date(now.getTime() + 50 * 3600 * 1000),
      location: 'Auditorium',
      bannerUrl: '',
      tags: ['culture'],
      isFeatured: false,
      isPublished: true,
    },
    {
      title: 'Scaler Hackathon',
      slug: 'scaler-hackathon',
      category: 'hackathon',
      description: 'Build something awesome',
      startAt: new Date(now.getTime() + 72 * 3600 * 1000),
      endAt: new Date(now.getTime() + 96 * 3600 * 1000),
      location: 'Lab Block',
      bannerUrl: '',
      tags: ['hackathon'],
      isFeatured: true,
      isPublished: true,
    },
  ];

  await Event.deleteMany({ slug: { $in: sampleEvents.map(e => e.slug) } });
  await Event.insertMany(sampleEvents);

  // Award some points
  const allHouses = await House.find();
  const houseMap = Object.fromEntries(allHouses.map(h => [h.name, h]));
  const awards = [
    { houseId: houseMap['PHOENIX']._id, points: 18500, reason: 'Season aggregate' },
    { houseId: houseMap['TUSKER']._id, points: 14800, reason: 'Season aggregate' },
    { houseId: houseMap['LEO']._id, points: 12100, reason: 'Season aggregate' },
    { houseId: houseMap['KONG']._id, points: 11800, reason: 'Season aggregate' },
  ];
  await LeaderboardEntry.insertMany(awards);

  // Update denormalized house points
  for (const a of awards) {
    await House.findByIdAndUpdate(a.houseId, { $inc: { points: a.points } });
  }

  console.log('Seed complete');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
