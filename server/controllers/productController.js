import Product from "../models/product.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from 'streamifier';
export const getAllProducts = async (req, res) => {
  try {
    const { category, search, maxPrice } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" }; 
    }

    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};


const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "clothes" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const createProduct = async (req, res) => {
  try {
    const { name, size, price, category ,material } = req.body; // newly added material

    // Upload all images in parallel
    const imageUploads = await Promise.all(
      req.files.map(file => streamUpload(file.buffer))
    );

    const product = new Product({
      name,
      size,
      price,
      category,
     // newly added 
     material,
      image: imageUploads, // This will be an array of URLs
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, size,category,material } = req.body; 
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = await Promise.all(
        req.files.map(file => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "clothes" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
              }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
          });
        })
      );
    }

    const updatedImages = [...(product.image || []), ...newImages];
    product.name = name || product.name;
    product.price = price || product.price;
    product.size = size || product.size;
    product.material = material || product.material; 
    product.category = category || product.category;
    product.image = updatedImages;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
