const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'ForumPost', required: true, index: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  content: { type: String, required: true, trim: true, maxlength: 2000 },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
