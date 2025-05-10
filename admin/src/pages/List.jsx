import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "sonner";

const Lists = ({token}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message,{
          duration:2000,
        });
      }
    } catch (error) {
      toast.error(error.message,{
        duration:2000,
      });
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove",{id},{headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message,{
          duration:2000,
        });
        await fetchList()
      }else{
        toast.error(response.data.message,{
          duration:2000,
        });
      }
    } catch (error) {
      toast.error(error.message,{
        duration:2000,
      })
    }
  }
  useEffect(() => {
    fetchList();
  });
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* list table items  */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-slate-200 border-gray-300 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* product list  */}
        {
          list.map((item,index)=> (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm">
             <img className="w-12" src={item.image[0]} alt="" />
             <p>{item.name}</p>
             <p>{item.category}</p>
             <p>{currency}{item.price}</p>
             <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg text-red-500">X</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Lists;
