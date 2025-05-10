import { orderModel } from "../models/orderModel.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
// global variables
const currency = "inr";
const deliveryCharges = 10;

// paciing order using cod method
export const placeOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await orderModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({
      message: "Order Placed Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

// placing orders using Razorpay method
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const razorpayInstance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log("Razorpay Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const verifyRazorpay = async (req,res) => {
//     try {
//         const {userId , razorpay_order_id} = req.body
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         console.log(orderInfo);
        
//     } catch (error) {
//          res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//     }
// }

// all orders for admin panel
export const allorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

// user data for frontend
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

// update the order status from admin panel
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};
