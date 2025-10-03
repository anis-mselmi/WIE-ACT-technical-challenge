// Attach standardized response helpers to res
module.exports = (req, res, next) => {
  res.success = (data, status = 200) => res.status(status).json({ success: true, data });
  res.fail = (error, status = 400) => {
    if (typeof error === 'string') return res.status(status).json({ success: false, error });
    return res.status(status).json({ success: false, error: error.message || error });
  };
  next();
};
