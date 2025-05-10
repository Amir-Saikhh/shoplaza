import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "./ProductItem";
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div data-aos="fade-right" data-aos-duration="600" className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p data-aos="fade-left" data-aos-duration="600" className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Top Picks Everyone Loves
        Our best sellers are tried, tested, and loved. Shop the most popular styles that keep our customers coming back for more.
        </p>
      </div>
       {/* rendering products  */}
       <div data-aos="fade-right" data-aos-duration="600" className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6'>
        {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
