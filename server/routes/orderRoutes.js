import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();
router.post("/", placeOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);

export default router;
