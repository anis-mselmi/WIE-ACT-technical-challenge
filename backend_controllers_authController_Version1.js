const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createAccessToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '15m' });
const createRefreshToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRES || '7d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body;
    const user = new User({ name, email, password, role, profile });
    await user.save();
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  user.refreshTokens.push(refreshToken);
  await user.save();
  res.success({ user: { ...user.toObject(), password: undefined }, token: accessToken, refreshToken }, 201);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.fail('Invalid credentials.', 401);
    }
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  user.refreshTokens.push(refreshToken);
  await user.save();
  res.success({ user: { ...user.toObject(), password: undefined }, token: accessToken, refreshToken });
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.getProfile = async (req, res) => {
  res.success({ user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    Object.assign(req.user, req.body);
    await req.user.save();
    res.success({ user: req.user });
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.fail('No refresh token provided.', 401);
    let payload;
    try { payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); } catch (err) { return res.fail('Invalid refresh token.', 401); }
    const user = await User.findById(payload.id).select('+refreshTokens');
    if (!user) return res.fail('User not found.', 401);
    if (!user.refreshTokens.includes(refreshToken)) return res.fail('Refresh token revoked.', 401);
    const accessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    // rotate refresh token
    user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
    user.refreshTokens.push(newRefreshToken);
    await user.save();
    res.success({ token: accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.fail('No refresh token provided.', 400);
    let payload;
    try { payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); } catch (err) { return res.success({ message: 'Logged out' }); }
    const user = await User.findById(payload.id).select('+refreshTokens');
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
      await user.save();
    }
    res.success({ message: 'Logged out' });
  } catch (err) {
    res.fail(err, 400);
  }
};