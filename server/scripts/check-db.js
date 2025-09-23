require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  console.log('Connecting to', uri.replace(/:\w+@/, ':****@'));
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: false });
  console.log('Connected OK');
  await mongoose.disconnect();
  console.log('Disconnected');
}

main().catch((e) => {
  console.error('DB check failed:', e.message);
  process.exit(1);
});


