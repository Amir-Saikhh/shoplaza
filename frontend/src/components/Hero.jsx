import React from "react";
import {assets} from '../assets/assets.js'
const Hero = () => {
  return (
    <div  className="flex flex-col sm:flex-row border border-gray-400 ">
      {/* hero  left  */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2 justify-center">
            <p  data-aos="fade-right" data-aos-duration="600" className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p data-aos="fade-right" data-aos-duration="600" className="font-medium text-sm">OUR BESTSELLERS</p>
          </div>
          <h1 data-aos="fade-left" data-aos-duration="600" className="text-3xl sm:py-3 font-prata w-full lg:text-nowrap p-5 lg:text-5xl leading-relaxed items-center justify-center">LATEST ARRIVALS</h1>
          <div className="flex items-center gap-2 justify-center">
          <p data-aos="fade-up" data-aos-duration="600" className="font-medium text-sm">SHOP NOW</p>
          <p data-aos="fade-down" data-aos-duration="600" className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* HERO right */}
      <img data-aos="fade-left" data-aos-duration="600" src="https://wallpapers.com/images/featured/thor-qzytdg8xliuaelun.jpg" className="w-full sm:h-1/2" alt="" />
    </div>
  );
};

export default Hero;
