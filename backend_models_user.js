const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const PROFILE_SCHEMA = new Schema({
  phone: { type: String, trim: true },
  location: { type: String, trim: true },
  bio: { type: String, trim: true, maxlength: 1000 },
}, { _id: false });

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['farmer', 'buyer', 'admin'], default: 'farmer', index: true },
  profile: { type: PROFILE_SCHEMA, default: {} },
  // store issued refresh tokens (hashed ideally in prod)
  refreshTokens: { type: [String], select: false, default: [] },
}, { timestamps: true });

// Index for quick lookups by role + location
userSchema.index({ 'role': 1, 'profile.location': 1 });

// Hash password before save if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
