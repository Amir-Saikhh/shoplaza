import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewzLetter from '../components/NewzLetter'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div  className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div  className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p data-aos="fade-up" data-aos-duration="600">Welcome to our shoplaza store – a place where style meets purpose. We are passionate about bringing you handpicked products that combine quality craftsmanship with timeless design. Whether you're looking for daily essentials or something unique to express your personality, our collection is curated to inspire confidence and elevate your lifestyle. At the core of our brand lies a commitment to authenticity, sustainability, and customer satisfaction.</p>
          <b data-aos="fade-left" data-aos-duration="600" className='text-gray-800'>Our mission</b>
          <p data-aos="fade-right" data-aos-duration="600">Our mission is to create an inclusive shopping experience that empowers individuals through fashion and innovation. We believe in doing business with heart—putting people and the planet first. As we grow, our vision remains clear: to build a community that values creativity, supports ethical practices, and celebrates the joy of self-expression. Thank you for being a part of our journey.</p>
        </div>
      </div>
      <div data-aos="fade-left" data-aos-duration="600" className='text-xl py-4 '>
         <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b data-aos="fade-down" data-aos-duration="600">Quality Assurance:</b>
          <p data-aos="fade-up" data-aos-duration="600" className='text-gray-600'>We offer only carefully selected, high-quality products to ensure durability, comfort, and style in every purchase.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b data-aos="fade-left" data-aos-duration="600">Convenience:</b>
          <p data-aos="fade-right" data-aos-duration="600" className='text-gray-600'>Our seamless shopping experience—from browsing to checkout—is designed to save your time and make online shopping hassle-free.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b data-aos="fade-up" data-aos-duration="600">Exceptional Customer Service:</b>
          <p data-aos="fade-left" data-aos-duration="600" className='text-gray-600'>We're here for you! Our support team is friendly, responsive, and ready to help with any questions or concerns.</p>
        </div>
      </div>
      <NewzLetter/>
    </div>
  )
}

export default About