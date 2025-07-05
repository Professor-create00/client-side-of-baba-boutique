import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Routes
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get product by ID
router.get("/category/:category", getProductsByCategory); // Get products by category
router.post("/", upload.array("images", 5), createProduct); // Add product
// PUT /api/products/:id - Update product
// router.put("/:id", upload.array("images", 5), updateProduct);
// router.put('/:id', upload.array('image'), updateProduct); 

router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
