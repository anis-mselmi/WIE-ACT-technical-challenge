// Central exports for backend models
const User = require('./backend_models_user');
const Product = require('./backend_models_product');
const Ride = require('./backend_models_ride');
const ForumPost = require('./backend_models_forumpost');
const Comment = require('./backend_models_comment');

module.exports = {
  User,
  Product,
  Ride,
  ForumPost,
  Comment,
};
