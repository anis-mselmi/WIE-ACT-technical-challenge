const mongoose = require('mongoose');
const { Schema } = mongoose;

const VALID_CATEGORIES = ['pests', 'irrigation', 'markets', 'tools', 'weather'];

const forumPostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  content: { type: String, required: true, trim: true, maxlength: 5000 },
  category: { type: String, enum: VALID_CATEGORIES, required: true, index: true },
  upvotes: { type: Number, default: 0, min: 0 },
  downvotes: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

forumPostSchema.index({ title: 'text', content: 'text' }, { weights: { title: 5, content: 1 } });

module.exports = mongoose.model('ForumPost', forumPostSchema);
