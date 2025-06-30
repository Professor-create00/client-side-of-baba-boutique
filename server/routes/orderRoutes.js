import express from "express";
import { createOrder, deleteOrder, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

// @route   POST /api/orders
router.post("/", createOrder);
router.get("/",getAllOrders)
router.delete("/:id",deleteOrder)

export default router;
