const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const allowedDomain = 'sst.scaler.com';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    avatarUrl: { type: String },
    passwordHash: { type: String },
    googleId: { type: String, index: true },
    provider: { type: String, enum: ['credentials', 'google'], required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

userSchema.path('email').validate(function (value) {
  const domain = (value || '').split('@')[1];
  return domain === allowedDomain;
}, `Email must be on domain ${allowedDomain}`);

userSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);


