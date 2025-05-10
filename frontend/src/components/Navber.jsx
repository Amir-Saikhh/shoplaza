import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "sonner";

const Navber = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setShowSearch, getCartCount, token, setToken , navigate ,setCartItem } = useContext(ShopContext);

  const handleLogout = () => {
    navigate('/login')
    toast.success("Logout successfully",{duration:2000})
    localStorage.removeItem("token");
    setToken(''); // Update context state
    setCartItem({})
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 font-medium relative">
      <Link to="/">
        <h2
          data-aos="fade-right"
          data-aos-duration="600"
          className="font-prata lg:text-3xl text-2xl mr-3 text-gray-700 select-none lg:ml-[-3rem]"
        >
          SHOPLAZA
        </h2>
      </Link>

      {/* Desktop Menu */}
      <ul
        data-aos="fade-up"
        data-aos-duration="600"
        className="hidden sm:flex gap-5 text-sm text-gray-700"
      >
        {["/", "/collection", "/about", "/contact"].map((path, index) => {
          const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <li key={index}>
              <NavLink
                to={path}
                className="flex flex-col items-center gap-1 transition-transform duration-300"
              >
                <p>{labels[index]}</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          data-aos="fade-left"
          data-aos-duration="600"
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

        {/* Profile Icon with Dropdown */}
        <div className="relative group">
          {token ? (
            <>
              <img
                data-aos="fade-left"
                data-aos-duration="600"
                src={assets.profile_icon}
                alt="profile"
                className="w-5 sm:w-5 cursor-pointer"
              />
              <div className="hidden group-hover:block absolute right-0 pt-4 z-10">
                <div className="text-gray-500 rounded flex flex-col gap-3 py-3 px-5 bg-slate-100 w-36 shadow-md">
                  <p className="cursor-pointer p-1 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200">
                    My profile
                  </p>
                  <p onClick={()=>navigate("/orders")} className="cursor-pointer p-1 rounded hover:bg-gray-200 transition-colors duration-200">
                    Orders
                  </p>
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer p-1 rounded hover:bg-red-600 bg-red-500 text-white font-prata transition-colors duration-200"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">
              <img
                data-aos="fade-left"
                data-aos-duration="600"
                src={assets.profile_icon}
                alt="profile"
                className="w-5 sm:w-5 cursor-pointer"
              />
            </Link>
          )}
        </div>

        {/* Cart Icon */}
        <Link
          data-aos="fade-left"
          data-aos-duration="600"
          to="/cart"
          className="relative"
        >
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setSidebarOpen(true)}
          src={assets.menu_icon}
          className="sm:hidden w-5 cursor-pointer"
          alt="menu"
        />
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full z-20 bg-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-full sm:w-2/3" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full text-gray-600">
          <div
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="back"
            />
            <p>Back</p>
          </div>
          {["/", "/collection", "/about", "/contact"].map((path, index) => {
            const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <NavLink
                key={index}
                className="py-3 pl-6 border-b"
                to={path}
                onClick={() => setSidebarOpen(false)}
              >
                {labels[index]}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navber;
