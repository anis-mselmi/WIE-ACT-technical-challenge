const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  url: { type: String, required: true, trim: true },
  alt: { type: String, trim: true },
}, { _id: false });

const productSchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  images: { type: [imageSchema], default: [] },
  status: { type: String, enum: ['available', 'sold'], default: 'available', index: true },
}, { timestamps: true });

// Text index for marketplace search
productSchema.index({ title: 'text', description: 'text' }, { weights: { title: 5, description: 1 } });
productSchema.index({ farmer: 1, status: 1 });

module.exports = mongoose.model('Product', productSchema);
