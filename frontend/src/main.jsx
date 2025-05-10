import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PacmanLoader} from "react-spinners";
import React, { useState, useEffect } from "react";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate load time (e.g., API call or DOM readiness)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="h-screen w-screen flex justify-center items-center bg-white">
      <PacmanLoader color="#000" />
    </div>
  ) : (
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
