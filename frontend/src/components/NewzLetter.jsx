import React from "react";

const NewzLetter = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p data-aos="fade-down" data-aos-duration="600" className="font-prata text-2xl text-gray-800">
        Subscribe now and get 30% off
      </p>
      <p data-aos="fade-up" data-aos-duration="600">
        Subscribe now and get 30% off your first order! Stay updated with our
        latest deals and offers.
      </p>
      <form data-aos="fade-left" data-aos-duration="600"
        onSubmit={submitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 "
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          name=""
          id=""
          required
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white lg:px-10 lg:py-4 md:px-10 md:py-4 text-xs py py-3 px-8"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewzLetter;
