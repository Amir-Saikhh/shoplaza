import { Router } from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  allorders,
  placeOrderCod,
  placeOrderRazorpay,
  updateStatus,
  userOrders,
  // verifyRazorpay,
} from "../controllers/orderController.js";

const orderRouter = Router();

// admin features
orderRouter.post("/list", adminAuth, allorders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment features
orderRouter.post("/place", authUser, placeOrderCod);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// user features
orderRouter.post("/userorders", authUser, userOrders);

// verify payment
// orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter;
