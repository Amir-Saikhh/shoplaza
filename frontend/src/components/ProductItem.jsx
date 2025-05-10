import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext)
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div data-aos="fade-right" data-aos-duration="600" className='overflow-hidden rounded-md'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            <p className='pt-3 pb-1 text-sm '>{name}</p>
            <p className='font-medium text-sm'>{currency}{price}</p>
        </div>
    </Link>
  )
}

export default ProductItem