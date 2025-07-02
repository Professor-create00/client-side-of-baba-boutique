import Order from "../models/orderModel.js";
import sendEmail from "../utils/sendEmail.js"; // assuming your utility is named like this

export const createOrder = async (req, res) => {
  try {
    const { name, phone, address, productName, productId } = req.body;

    if (!name || !phone || !address || !productName || !productId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newOrder = new Order({
      name,
      phone,
      address,
      productName,
      productId,
    });

    await newOrder.save();

    // Send email notification
    const message = `
      🛒 *New Order Received*

      👤 Name: ${name}
      📱 Phone: ${phone}
      🏠 Address: ${address}
      📦 Product: ${productName}
      🆔 Product ID: ${productId}
    `;
    await sendEmail("New Order Received", message);

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};



export const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};
