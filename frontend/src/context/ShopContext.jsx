import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItem);
    if (!size) {
      toast.error("Please select size!");
      return;
    }
    //  If the product ID already exists in the cart
    if (cartData[itemId]) {
      //  If the selected size already exists, increment the quantity
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        // If size doesn't exist for that product, add it with quantity 1
        cartData[itemId][size] = 1;
      }
    } else {
      // If product doesn't exist in the cart
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
        toast.success("Item added to cart",{duration:2000 })
      } catch (error) {
        console.log(error.message);
        toast.error(error.message)
      }
    }
  }
  const getCartCount = () => {
    let totalCount = 0;
    // Loops through the main cart object by product ID (items is a product ID like "123").
    for (const items in cartItem) {
      // Loops through each size inside that product (item might be "S", "M", "L", etc.).
      for (const item in cartItem[items]) {
        try {
          // Checks if the quantity for that size is greater than 0.
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
          
        }
      }
    }
    // Returns the total number of items in the cart.
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if (token) {
        try {
          await axios.post(backendUrl + '/api/cart/update',{itemId, size, quantity},{headers:{token}})
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)  
        }
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Error fetching products");
    }
  };
  
   const getUserCart = async(token) => {
      try {
        const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
        if (response.data.success) {
          setCartItem(response.data.cartData)
        }
      } catch (error) {
        console.log(error.message)
          toast.error(error.message) 
      }
   }

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem('token'))
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
