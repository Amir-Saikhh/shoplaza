import React from "react";
import Navber from "./components/Navber";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import { useState } from "react"; 
import Login from "./components/Login.jsx";
import {Toaster } from 'sonner'
import Scroller from "./components/ScrollToTop/Scroller.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'
const App = () => {
  useEffect(() => {
    Aos.init({
      offset: 100,
      duration: 1000,
      easing: "ease",
      delay: 100,
    });
    Aos.refresh();
  }, []);
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):"");
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <Scroller/>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navber setToken={setToken} />
          <hr />
          <div className="flex">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8  text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
