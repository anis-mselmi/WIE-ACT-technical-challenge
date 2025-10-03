require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Ride = require('./models/Ride');
const ForumPost = require('./models/ForumPost');
const Comment = require('./models/Comment');

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('Please set MONGO_URI in your .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  // Clean
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Ride.deleteMany({}),
    ForumPost.deleteMany({}),
    Comment.deleteMany({})
  ]);

  // Users: 3 farmers, 2 buyers
  const farmers = [
    { name: 'Amina', email: 'amina@agrinova.com', password: 'pass1234', role: 'farmer', profile: { phone: '111111111', location: 'Tunis', bio: 'Olive grower' } },
    { name: 'Sana', email: 'sana@agrinova.com', password: 'pass1234', role: 'farmer', profile: { phone: '222222222', location: 'Sfax', bio: 'Honey producer' } },
    { name: 'Fatma', email: 'fatma@agrinova.com', password: 'pass1234', role: 'farmer', profile: { phone: '333333333', location: 'Kairouan', bio: 'Couscous expert' } }
  ];
  const buyers = [
    { name: 'Imen', email: 'imen@agrinova.com', password: 'pass1234', role: 'buyer', profile: { phone: '444444444', location: 'Djerba' } },
    { name: 'Noura', email: 'noura@agrinova.com', password: 'pass1234', role: 'buyer', profile: { phone: '555555555', location: 'Sousse' } }
  ];

  const createdUsers = await User.insertMany([...farmers, ...buyers]);
  const [amina, sana, fatma, imen, noura] = createdUsers;

  // Products (olives, couscous, honey, dates, olive oil)
  const productsData = [
    { farmer: amina._id, title: 'Olives', description: 'Fresh olives from Tunis', price: 20, quantity: 100, images: [], status: 'available' },
    { farmer: fatma._id, title: 'Couscous', description: 'Handmade couscous', price: 15, quantity: 200, images: [], status: 'available' },
    { farmer: sana._id, title: 'Honey', description: 'Organic honey', price: 35, quantity: 50, images: [], status: 'available' },
    { farmer: amina._id, title: 'Dates', description: 'Premium dates', price: 25, quantity: 150, images: [], status: 'available' },
    { farmer: sana._id, title: 'Olive Oil', description: 'Cold-pressed olive oil', price: 40, quantity: 60, images: [], status: 'available' }
  ];
  const products = await Product.insertMany(productsData);

  // Rides (3 offers)
  const ridesData = [
    { driver: amina._id, departure: 'Tunis', destination: 'Sfax', dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), seatsAvailable: 3, costPerSeat: 10, passengers: [imen._id] },
    { driver: sana._id, departure: 'Sfax', destination: 'Kairouan', dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), seatsAvailable: 2, costPerSeat: 15, passengers: [] },
    { driver: fatma._id, departure: 'Kairouan', destination: 'Tunis', dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), seatsAvailable: 4, costPerSeat: 12, passengers: [noura._id] }
  ];
  const rides = await Ride.insertMany(ridesData);

  // Forum posts (4)
  const postsData = [
    { author: amina._id, title: 'How to manage olive pests?', content: 'Advice on pest control needed, especially for olive groves near coastal areas.', category: 'pests' },
    { author: sana._id, title: 'Best irrigation techniques?', content: 'Looking for efficient drip irrigation setups for small plots.', category: 'irrigation' },
    { author: fatma._id, title: 'Where to sell couscous?', content: 'Market recommendations for handmade couscous and regional buyers.', category: 'markets' },
    { author: amina._id, title: 'Weather affecting crops', content: 'How to prepare for heavy rains and protect harvests?', category: 'weather' }
  ];
  const forumPosts = await ForumPost.insertMany(postsData);

  // Comments under posts
  const commentsData = [
    { post: forumPosts[0]._id, author: sana._id, content: 'Try neem oil and regular pruning to reduce pests.' },
    { post: forumPosts[1]._id, author: fatma._id, content: 'Drip irrigation saved water for me last season.' },
    { post: forumPosts[2]._1, author: amina._id, content: 'Local market in Tunis and online groups are helpful.' },
    { post: forumPosts[3]._id, author: noura._id, content: 'Check the weather forecast and cover crops when needed.' }
  ];

  // Fix a likely accidental typo in index for third comment (use correct field names)
  // Insert comments but ensure we reference proper post ids
  const correctedComments = [
    { post: forumPosts[0]._id, author: sana._id, content: 'Try neem oil and regular pruning to reduce pests.' },
    { post: forumPosts[1]._id, author: fatma._id, content: 'Drip irrigation saved water for me last season.' },
    { post: forumPosts[2]._id, author: amina._id, content: 'Local market in Tunis and online groups are helpful.' },
    { post: forumPosts[3]._id, author: noura._id, content: 'Check the weather forecast and cover crops when needed.' }
  ];

  await Comment.insertMany(correctedComments);

  console.log('Seed complete.');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
