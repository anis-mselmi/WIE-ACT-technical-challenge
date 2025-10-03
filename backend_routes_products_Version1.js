const express = require('express');
const router = express.Router();
const { createProduct, listProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.get('/', listProducts);
router.post('/', authMiddleware, roleMiddleware('farmer', 'admin'), createProduct);
router.get('/:id', getProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;