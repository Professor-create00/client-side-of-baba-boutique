import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },
    price: {
      type: Number,
      required: [true, "Please add a product price"],
    },
    description: {
      type: String,
    },
    size: {
      type: String, // array of sizes, optional
    },
    images: {
      type: [String], // array of Cloudinary image URLs
      required: [true, "Please add at least one image"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Sarees", "Salwar Kurti", "Pickle", "Nighty", "Masalas"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
