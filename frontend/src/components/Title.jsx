import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3 ">
      <p data-aos="fade-right" data-aos-duration="600" className="text-gray-500 font-prata">
        {text1} <span className="text-gray-700 font-prata">{text2}</span>
      </p>
      <p data-aos="fade-left" data-aos-duration="600" className="sm:w-12 w-8 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
