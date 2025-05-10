import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
;

const Navber = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setToken("");                    
    toast.success("Logged out successfully",{
      duration:2000,
    }); 
    navigate("/");          
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <Link to="/">
        <h2
          data-aos="fade-right"
          data-aos-duration="600"
          className="font-prata lg:text-3xl text-2xl mr-3 text-gray-700 select-none"
        >
          SHOPLAZA
        </h2>
      </Link>
      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded-full sm:px-7 sm:py-2 text-xs hover:bg-gray-600 hover:text-white transition-all duration-500 font-prata"
      >
        Logout
      </button>
    </div>
  );
};

export default Navber;
