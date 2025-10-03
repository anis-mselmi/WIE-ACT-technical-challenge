const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 140 },
  content: { type: String, required: true, trim: true, maxlength: 4000 },
  category: { type: String, enum: ['pests', 'irrigation', 'markets', 'tools', 'weather'], required: true, index: true },
  upvotes: { type: Number, default: 0, min: 0 },
  downvotes: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', forumPostSchema);