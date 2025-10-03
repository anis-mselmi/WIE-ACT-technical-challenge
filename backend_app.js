const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || '';
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);
    if (CLIENT_URL && origin === CLIENT_URL) return callback(null, true);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// attach standardized response helpers (res.success / res.fail)
app.use(require('./middleware/responseHelpers'));

app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/rides', require('./routes/rides'));
app.use('/forum', require('./routes/forum'));

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000))
  .catch(err => console.error('DB connection error:', err));