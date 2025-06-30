import express from 'express';

import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from './routes/orderRoutes.js';

// Initialize express app
const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);

// Routes
app.use('/api/products', productRoutes);

app.use("/api/admin", adminRoutes);

// Root route to test server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});