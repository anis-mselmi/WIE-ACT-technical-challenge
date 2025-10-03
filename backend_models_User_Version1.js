const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['farmer', 'buyer', 'admin'], default: 'farmer', index: true },
  profile: {
    phone: { type: String, trim: true, match: /^[0-9+\-() ]{7,20}$/ },
    location: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 500 }
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);