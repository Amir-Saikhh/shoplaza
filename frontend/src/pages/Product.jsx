import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency ,addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div  className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img data-aos="fade-right" data-aos-duration="600"
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div data-aos="fade-left" data-aos-duration="600" className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* product info */}
        <div className="flex-1">
          <h1 className="font-light text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img  data-aos="fade-right" data-aos-duration="600" src={assets.star_icon} className="w-3" alt="" />
            <img data-aos="fade-left" data-aos-duration="600" src={assets.star_icon} className="w-3" alt="" />
            <img data-aos="fade-right" data-aos-duration="600" src={assets.star_icon} className="w-3" alt="" />
            <img  data-aos="fade-up" data-aos-duration="600" src={assets.star_icon} className="w-3" alt="" />
            <img  data-aos="fade-down" data-aos-duration="600" src={assets.star_dull_icon} className="w-3" alt="" />
            <p data-aos="fade-down" data-aos-duration="600" className="pl-2">(150)</p>
          </div>
          <p data-aos="fade-left" data-aos-duration="600" className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p data-aos="fade-right" data-aos-duration="600" className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p data-aos="fade-down" data-aos-duration="600">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 bg-gray-100 ${
                    item === size ? " border-2 border-blue-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button data-aos="fade-down" data-aos-duration="600" onClick={()=>addToCart(productData._id,size)} className="px-8 py-3 text-white bg-black text-sm active:bg-gray-700 ">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 mb-5">
            <p data-aos="fade-down" data-aos-duration="600">100% Original product.</p>
            <p data-aos="fade-left" data-aos-duration="600">Cash on delivery is available on this product.</p>
            <p data-aos="fade-up" data-aos-duration="600">Easy return and exchange policy within 7 days. </p>
          </div>
        </div>
      </div>
      {/* description and review  */}
      <div className="mt-15 mb-10">
        <div className="flex">
          <b data-aos="fade-left" data-aos-duration="600" className="border px-5 py-3 text-sm">Description</b>
          <p data-aos="fade-right" data-aos-duration="600" className="border px-5 py-3 text-sm">Reviews(150)</p>
        </div>
        <div data-aos="fade-right" data-aos-duration="600" className='flex flex-col gap-4 border px-6 py-6 text-sm  text-gray-500'>
          <p data-aos="fade-down" data-aos-duration="600">I recently purchased this product, and I must say I’m really impressed! The quality is excellent, and it looks exactly like the pictures. The packaging was neat, and delivery was quick. I’ve been using it for a week now, and it’s working perfectly. Totally worth the price—I’ll definitely buy from this store again.</p>
          <p data-aos="fade-up" data-aos-duration="600">I had high hopes for this product, and it didn’t disappoint. The material feels premium, and the fit is just right. I also appreciated the customer support team—they responded quickly to my queries. Overall, I’m very happy with my purchase and would recommend it to anyone looking for something reliable and stylish.</p>
        </div>
      </div>
      {/* related products  */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
