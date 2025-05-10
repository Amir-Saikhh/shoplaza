import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "sonner";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message, { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);


  const statusUpdated = async (e,orderId) => {
        try {
          const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:e.target.value},{headers:{token}})
          if (response.data.success) {
            await fetchAllOrders()
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
  }

  return (
    <div className="p-4 md:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Admin Orders Panenl</h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-[60px_1.5fr_1fr_1fr_1fr] gap-4 border border-gray-300 rounded-xl shadow-sm p-5 hover:shadow-md transition duration-200 bg-white"
          >
            {/* Icon */}
            <div className="flex items-start justify-center pt-2">
              <img className="w-10 h-10" src={assets.parcel_icon} alt="parcel" />
            </div>

            {/* Items and Address */}
            <div className="space-y-2">
              <div className="font-medium text-gray-900">Items:</div>
              <div className="text-sm text-gray-700">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} x {item.quantity} <span>({item.size})</span>
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>

              <div className="pt-3 text-sm text-gray-600">
                <p className="font-medium text-gray-800">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>{order.address?.street}</p>
                <p>
                  {order.address?.city}, {order.address?.country} -{" "}
                  {order.address?.zipcode}
                </p>
                <p>📞 {order.address?.phone}</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium">Items:</span> {order.items.length}
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {order.payment ? (
                  <span className="text-red-600 font-semibold">Pending</span>
                ) : (
                  <span className="text-green-600 font-semibold">Done</span>
                )}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <div className="flex items-start pt-1 text-lg font-bold text-gray-800">
              {currency}
              {order.amount}
            </div>

            {/* Status Dropdown */}
            <div className="flex items-start pt-1">
              <select onChange={(e)=>statusUpdated(e,order._id)} value={order.status} className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
