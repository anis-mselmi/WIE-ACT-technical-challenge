require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Ride = require('./models/Ride');
const ForumPost = require('./models/ForumPost');
const Comment = require('./models/Comment');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Ride.deleteMany({}),
    ForumPost.deleteMany({}),
    Comment.deleteMany({})
  ]);

  // Users
  const farmers = [
    { name: 'Amina', email: 'amina@agrinova.com', password: 'pass1234', role: 'farmer', profile: { phone: '111111111', location: 'Tunis', bio: 'Olive grower' } },
    { name: 'Sana', email: 'sana@agrinova.com', password: 'pass1234', role: 'farmer', profile: { phone: '222222222', location: 'Sfax', bio: 'Honey producer' } },
    { name: 'Fatma', email: 'fatma@agrinova.com', password: 'pass1234', role: 'farmer', profile: { phone: '333333333', location: 'Kairouan', bio: 'Couscous expert' } }
  ];
  const buyers = [
    { name: 'Imen', email: 'imen@agrinova.com', password: 'pass1234', role: 'buyer', profile: { phone: '444444444', location: 'Djerba' } },
    { name: 'Noura', email: 'noura@agrinova.com', password: 'pass1234', role: 'buyer', profile: { phone: '555555555', location: 'Sousse' } }
  ];

  const users = await User.insertMany([...farmers, ...buyers]);

  // Products
  const products = await Product.insertMany([
    { farmer: users[0]._id, title: 'Olives', description: 'Fresh olives from Tunis', price: 20, quantity: 100, images: [], status: 'available' },
    { farmer: users[1]._id, title: 'Honey', description: 'Organic honey', price: 35, quantity: 50, images: [], status: 'available' },
    { farmer: users[2]._id, title: 'Couscous', description: 'Handmade couscous', price: 15, quantity: 200, images: [], status: 'available' },
    { farmer: users[0]._id, title: 'Dates', description: 'Premium dates', price: 25, quantity: 150, images: [], status: 'available' },
    { farmer: users[1]._id, title: 'Olive Oil', description: 'Cold-pressed olive oil', price: 40, quantity: 60, images: [], status: 'available' }
  ]);

  // Rides
  const rides = await Ride.insertMany([
    { driver: users[0]._id, departure: 'Tunis', destination: 'Sfax', dateTime: new Date(Date.now() + 86400000), seatsAvailable: 3, costPerSeat: 10, passengers: [users[3]._id] },
    { driver: users[1]._id, departure: 'Sfax', destination: 'Kairouan', dateTime: new Date(Date.now() + 172800000), seatsAvailable: 2, costPerSeat: 15, passengers: [] },
    { driver: users[2]._id, departure: 'Kairouan', destination: 'Tunis', dateTime: new Date(Date.now() + 259200000), seatsAvailable: 4, costPerSeat: 12, passengers: [users[4]._id] }
  ]);

  // Forum posts
  const forumPosts = await ForumPost.insertMany([
    { author: users[0]._id, title: 'How to manage olive pests?', content: 'Advice on pest control needed.', category: 'pests' },
    { author: users[1]._id, title: 'Best irrigation techniques?', content: 'Looking for efficient methods.', category: 'irrigation' },
    { author: users[2]._id, title: 'Where to sell couscous?', content: 'Market recommendations?', category: 'markets' },
    { author: users[0]._id, title: 'Weather affecting crops', content: 'How to prepare for rainfall?', category: 'weather' }
  ]);

  // Comments
  await Comment.insertMany([
    { post: forumPosts[0]._id, author: users[1]._id, content: 'Try neem oil, works wonders!' },
    { post: forumPosts[1]._id, author: users[2]._id, content: 'Drip irrigation saves water.' },
    { post: forumPosts[2]._id, author: users[0]._id, content: 'Local markets in Tunis are good.' },
    { post: forumPosts[3]._id, author: users[4]._id, content: 'Check the weather app daily.' }
  ]);

  console.log('Seed data inserted.');
  process.exit();
})();