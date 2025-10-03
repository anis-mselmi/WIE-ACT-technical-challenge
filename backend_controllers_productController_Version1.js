const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const data = { ...req.body, farmer: req.user._id };
    const product = new Product(data);
    await product.save();
    res.success(product, 201);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.listProducts = async (req, res) => {
  try {
    const { q, status } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (status) filter.status = status;
    const products = await Product.find(filter).populate('farmer', 'name profile').sort('-createdAt');
    res.success(products);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name profile');
    if (!product) return res.fail('Product not found.', 404);
    res.success(product);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.fail('Product not found.', 404);
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.fail('Not authorized.', 403);
    }
    Object.assign(product, req.body);
    await product.save();
    res.success(product);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.fail('Product not found.', 404);
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.fail('Not authorized.', 403);
    }
    await product.deleteOne();
    res.success({ message: 'Product deleted.' });
  } catch (err) {
    res.fail(err, 400);
  }
};