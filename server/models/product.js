import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false, // optional for food items
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String], // cloudinary URL
    required: true,
  },
  material:{
    type:String,
    required:true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Saree", "Salwar Kurti", "Nighty", "Pickle", "Masala"],
  },
    expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 1 * 60 * 1000), // 30 days from now
    index: { expires: 0 }, // TTL index triggers deletion when this date is reached
  },
});
const Product = mongoose.model("Product", productSchema);
export default Product;
