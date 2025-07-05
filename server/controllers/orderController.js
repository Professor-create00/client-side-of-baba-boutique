import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import sendEmail from "../utils/sendEmail.js";


export const placeOrder = async (req, res) => {
  try {
    const { products, customerName, phone, address } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }
    const order = new Order({
      products,
      customerName,
      phone,
      address,
    });
    await order.save();

    // Send email notification
      await sendEmail({
      to: process.env.MOM_EMAIL, // Add MOM_EMAIL in .env
      subject: "📦 New Order Placed",
      text: `
        New Order Details:
        Name: ${customerName}
        Phone: ${phone}
        Address: ${address}
        Product: ${Product.name}
        Quantity: ${Product.quantity}
      `,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};


export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("products.product").sort({createdAt:-1});
  res.status(200).json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("product");
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json(order);
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  await order.deleteOne();
  res.status(200).json({ message: "Order deleted successfully" });
};








