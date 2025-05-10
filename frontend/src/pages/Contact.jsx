import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewzLetter from "../components/NewzLetter";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-20 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p data-aos="fade-up" data-aos-duration="600" className="font-prata text-xl text-gray-600">Our Store</p>
          <p data-aos="fade-right" data-aos-duration="600" className="text-gray-600">
            713302 Railpar <br /> ok road, asansol , west bengal - india
          </p>
          <p data-aos="fade-left" data-aos-duration="600" className="text-gray-600">
            contact: +91 9508148286 <br /> Email : amirsaikh950@gmail.com
          </p>
          <p data-aos="fade-down" data-aos-duration="600" className="text-gray-600">
            <b>Stay with shoplaza</b>
          </p>
          <Link data-aos="fade-right" data-aos-duration="600"
            className="px-8 py-2 border border-black font-prata text-sm hover:bg-black hover:text-white transition-all duration-500"
            to="/"
          >
            Explore our site
          </Link>
        </div>
      </div>
      <NewzLetter />
    </div>
  );
};

export default Contact;
