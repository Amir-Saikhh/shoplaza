import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/about";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/login";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Navber from "./components/Navber";
import Scroller from "./components/ScrollToTop/Scroller";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Aos from "aos";
import "aos/dist/aos.css";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import CanvasCursor from "./components/CanvasCursor";

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

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw]">
        <Navber />
        <SearchBar />
        <Scroller />
        <CanvasCursor/>
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
