// Quick require test: ensures model files load without syntax errors.
try {
  const models = require('./backend_models_index');
  console.log('Models loaded:', Object.keys(models).join(', '));
  process.exit(0);
} catch (err) {
  console.error('Error loading models:', err);
  process.exit(1);
}
