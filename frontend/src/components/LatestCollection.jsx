import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useState } from 'react'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
     const [latestProducts,setLstestProducts] = useState([])
    useEffect(()=>{
        setLstestProducts(products.slice(0,10))
    },[products])
  return (
    <div className='my-10 '>
      <div className='text-center py-8 text-3xl'>
        <Title  text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p data-aos="fade-left" data-aos-duration="600" className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Refresh your wardrobe with our latest collection — a blend of bold designs, seasonal must-haves, and everyday comfort. Handpicked for the modern trendsetter, these styles are made to move with you and stand out effortlessly
        </p>
      </div>
      {/* rendering products  */}
      <div data-aos="fade-right" data-aos-duration="600" className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
