import express from 'express';
import { getProductById } from '../controllers/productController.js';
const router = express.Router();

// Controller functions
import { 
  getAllProducts,
  createProduct 
} from '../controllers/productController.js';

// Multer middleware for image upload
import upload from '../middleware/upload.js';

// @route   GET /api/products
// @desc    Fetch all products
// @access  Public
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Create new product with image
// @access  Admin (in future with auth)
router.post('/', upload.array('images'), createProduct);
import { deleteProduct } from '../controllers/productController.js';

router.delete('/:id', deleteProduct);


import { updateProduct } from '../controllers/productController.js';

router.put('/:id', upload.array('images'), updateProduct); 


export default router;