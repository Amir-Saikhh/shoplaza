import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20  text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img data-aos="fade-right" data-aos-duration="600" src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p data-aos="fade-left" data-aos-duration="600" className='font-prata'>Easy Exchange Policy</p>
            <p data-aos="fade-down" data-aos-duration="600" className='text-gray-400'>Changed your mind? No worries! Enjoy quick and simple exchanges with zero stress</p>
        </div>
        <div>
            <img data-aos="fade-right" data-aos-duration="600" src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p data-aos="fade-left" data-aos-duration="600" className='font-prata'>14 Days Returns Policy</p>
            <p data-aos="fade-down" data-aos-duration="600" className='text-gray-400'>Not satisfied with your purchase? Return it within 14 days—no questions asked!</p>
        </div>
        <div>
            <img data-aos="fade-right" data-aos-duration="600" src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p data-aos="fade-left" data-aos-duration="600" className='font-prata'>Best cutomer supports</p>
            <p data-aos="fade-down" data-aos-duration="600" className='text-gray-400'>Need help? Our friendly support team is always here to assist you—quick, reliable, and ready 24/7!</p>
        </div>
    </div>
  )
}

export default OurPolicy