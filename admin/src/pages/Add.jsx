import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";
const Add = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message,{
          duration:2000,
        });
        setName("");
        setDescription("");
        setPrice("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message,{
          duration:2000,
        });
      } else {
        toast.error("Something went wrong",{
          duration:2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={submitHandler} className="space-y-6">
      {/* Image Upload Section */}
      <div className="w-full">
        <p className="font-semibold mb-3 text-lg text-gray-700">
          Upload Images
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          <div>
            <label htmlFor="image1" className="block cursor-pointer">
              <img
                className="w-20 h-20 object-cover border rounded-md hover:opacity-80 transition"
                src={
                  image1 instanceof Blob
                    ? URL.createObjectURL(image1)
                    : assets.upload_area
                }
                alt="image1"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
          </div>
          <div>
            <label htmlFor="image2" className="block cursor-pointer">
              <img
                className="w-20 h-20 object-cover border rounded-md hover:opacity-80 transition"
                src={
                  image2 instanceof Blob
                    ? URL.createObjectURL(image2)
                    : assets.upload_area
                }
                alt="image2"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
          </div>
          <div>
            <label htmlFor="image3" className="block cursor-pointer">
              <img
                className="w-20 h-20 object-cover border rounded-md hover:opacity-80 transition"
                src={
                  image3 instanceof Blob
                    ? URL.createObjectURL(image3)
                    : assets.upload_area
                }
                alt="image3"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
          </div>
          <div>
            <label htmlFor="image4" className="block cursor-pointer">
              <img
                className="w-20 h-20 object-cover border rounded-md hover:opacity-80 transition"
                src={
                  image4 instanceof Blob
                    ? URL.createObjectURL(image4)
                    : assets.upload_area
                }
                alt="image4"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label
          className="block mb-1 font-medium text-gray-700"
          htmlFor="productName"
        >
          Product Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black"
          type="text"
          id="productName"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div>
        <label
          className="block mb-1 font-medium text-gray-700"
          htmlFor="productDesc"
        >
          Product Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black resize-none"
          id="productDesc"
          placeholder="Write your content here"
          rows={4}
          required
        />
      </div>

      {/* Category & Subcategory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="category"
          >
            Product Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="subcategory"
          >
            Sub Category
          </label>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            id="subcategory"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 font-medium text-gray-700" htmlFor="price">
          Product Price ($)
        </label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black"
          type="number"
          id="price"
          placeholder="20"
          required
        />
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("S")
                  ? "bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  : "bg-slate-200"
              } hover:bg-slate-300`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("M")
                  ? "bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  : "bg-slate-200"
              } hover:bg-slate-300`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("L")
                  ? "bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  : "bg-slate-200"
              } hover:bg-slate-300`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("XL")
                  ? "bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  : "bg-slate-200"
              } hover:bg-slate-300`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("XXL")
                  ? "bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  : "bg-slate-200"
              } hover:bg-slate-300`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          name=""
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to seller
        </label>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="bg-black text-white px-8 py-3 w-full rounded-md font-prata mt-4"
      >
        {loading ? <SyncLoader size={10} color="white" /> : "ADD"}
      </button>
    </form>
  );
};

export default Add;
