import cloudinary from "../utils/cloudinary.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    

    const { name, price, description, size, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageUrls = [];
    for (let file of req.files) {

      const result = await uploadToCloudinary(file.buffer);
     
      if (!result || !result.secure_url) {
        continue;
      }
      imageUrls.push(result.secure_url);
    }
    const product = new Product({
      name,
      price,
      description,
      size,
      category,
      images: imageUrls,
    });

    await product.save();
    console.log("📦 Product saved:", product);

    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};




// GET /api/products/:id - Fetch single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /api/products/category/:category - Fetch products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    // Ensure category matches one of the enum values
    const allowedCategories = ["Sarees", "Salwar Kurti", "Pickle", "Nighty", "Masalas"];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products by category:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, description, size, category } = req.body;

    // Upload new images if provided
    let imageUrls = product.images; // keep existing images if no new ones
    if (req.files && req.files.length > 0) {
      imageUrls = []; // replace with new images
      for (const file of req.files) {
        const uploadResponse = await uploadToCloudinary(file.buffer);

        // ✅ Only push the secure_url
        imageUrls.push(uploadResponse.secure_url);
      }
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.size = size || product.size;
    product.category = category || product.category;
    product.images = imageUrls;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    for (const imageUrl of product.images) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`cloth-app/${publicId}`);
    }

    // Delete product from DB
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
