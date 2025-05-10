import React, { useState } from "react";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NewArrivals = () => {
  const [isDragging, setIsDragging] = useState(false);
  const newArrivalsData = [
    {
      _id: 1,
      name: "Classic Hoodie",
      price: 29.99,
      image:
        "https://img.freepik.com/premium-photo/fashion-handsome-stylish-man-model-with-fashionable-hoodie-is-wearing-leather-jacket-walking-city_338491-17414.jpg?w=740",
      altText: "Classic Hoodie on a model",
    },
    {
      _id: 2,
      name: "Urban Sneakers",
      price: 49.99,
      image:
        "https://img.freepik.com/free-photo/side-view-kid-skateboard-outdoors_23-2149484695.jpg?w=740",
      altText: "Urban Sneakers on a skateboard",
    },
    {
      _id: 3,
      name: "Denim Jacket",
      price: 59.99,
      image:
        "https://img.freepik.com/free-photo/man-portrait_1296-629.jpg?w=740",
      altText: "Denim Jacket on a model",
    },
    {
      _id: 4,
      name: "Cotton T-Shirt",
      price: 19.99,
      image:
        "https://img.freepik.com/free-photo/man-wearing-t-shirt-gesturing_23-2149393641.jpg?w=740",
      altText: "Cotton T-Shirt on a model",
    },
    {
      _id: 5,
      name: "Leather Boots",
      price: 89.99,
      image:
        "https://img.freepik.com/free-photo/pair-brown-leather-boots_1150-6005.jpg?w=740",
      altText: "Leather Boots on a wooden floor",
    },
    {
      _id: 6,
      name: "Slim Fit Jeans",
      price: 39.99,
      image:
        "https://img.freepik.com/free-photo/women-legs-front-yellow-wall_23-2148784188.jpg?w=740",
      altText: "Slim Fit Jeans on a model",
    },
    {
      _id: 7,
      name: "Sports Watch",
      price: 79.99,
      image:
        "https://img.freepik.com/premium-photo/man-sports-smartwatch-guy-does-pushups-stadium-application-heartbeat-monitoring-smart-watch-fat-burning-weight-loss-athlete-has-high-pulse-exercise_431724-8070.jpg?w=740",
      altText: "Sports Watch on a wrist",
    },
    {
      _id: 8,
      name: "Tee",
      price: 24.99,
      image:
        "https://img.freepik.com/free-photo/front-view-tea-herbal-concept-with-copy-space_23-2148555200.jpg?w=740",
      altText: "Tee on a table",
    },
    {
      _id: 9,
      name: "Running Shorts",
      price: 22.99,
      image:
        "https://img.freepik.com/premium-photo/man-wearing-shorts-that-say-shorts-with-black-top_1079878-894.jpg?w=740",
      altText: "Running Shorts on a model",
    },
    {
      _id: 10,
      name: "Wool Scarf",
      price: 14.99,
      image:
        "https://img.freepik.com/free-photo/warm-blankets-chair_169016-3135.jpg?w=740",
      altText: "Wool Scarf on a chair",
    },
    {
      _id: 11,
      name: "Canvas Tote",
      price: 18.99,
      image:
        "https://img.freepik.com/free-photo/back-view-man-carrying-tote-bag_53876-96623.jpg?w=740",
      alText: "Canvas Tote",
    },
    {
      _id: 12,
      name: "Sunglasses",
      price: 27.49,
      image:
        "https://img.freepik.com/premium-photo/close-up-sunglasses-sand-beach-against-sky_1048944-25952480.jpg?w=740",
      altText: "Sunglasses on a beach",
    },
  ];

  // Custom Arrow components
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute lg:top-[1px]  top-[-6px] lg:pb-10  rounded-full right-2 transform -translate-y-1/2 z-10 cursor-pointer text-3xl lg:text-5xl text-gray-700"
      onClick={onClick}
    >
      <FiChevronRight className="border rounded-full p-1  border-gray-400" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute lg:top-[-22px] top-[-10px] mt-1 right-12 transform -translate-y-1/2 z-10 cursor-pointer text-3xl lg:text-5xl text-gray-700"
      onClick={onClick}
    >
      <FiChevronLeft className="border rounded-full p-1  lg:m-[17px] border-gray-400" />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    smoothScroll: true,
    centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="px-4 md:px-10 py-6 lg:py-10 relative">
      <h2 data-aos="fade-right" data-aos-duration="600" className="lg:text-2xl text-xl font-prata mb-2 text-center">
        Discover The New Arrivals
      </h2>
      <p data-aos="fade-left" data-aos-duration="600" className="text-center mb-6 text-sm text-gray-600">
        Explore our latest collection of trendy and stylish products that are
        perfect for any occasion.
      </p>

      <Slider  {...settings}>
        {newArrivalsData.map((product) => (
          <div data-aos="fade-right" data-aos-duration="600"
            key={product._id}
            className={`px-3 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            <div className=" rounded-xl shadow-lg overflow-hidden p-3 group transition duration-300">
              <img
                src={product.image}
                alt={product.a}
                className="w-full h-[320px] object-cover rounded-xl mb-4"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default NewArrivals;
