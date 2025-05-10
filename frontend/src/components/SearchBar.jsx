import React, { useContext, useEffect, useState } from 'react'
import { ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext)
    const location = useLocation()
    const [visiable , setVisiable] = useState(false)

    useEffect(()=>{
      if(location.pathname.includes('collection')){
        setVisiable(true )
      }else{
        setVisiable(false)
      }
  
    },[location])
  return showSearch  && visiable ? (
    <div data-aos="fade-down" data-aos-duration="600" className='border-b border-t bg-gray-50 text-center'>
       <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
       <input className='flex-1 outline-none bg-inherit text-sm'
       value={search} onChange={(e)=>setSearch(e.target.value)}
       type="text" name="" id="" placeholder='Search'/>
       <img src={assets.search_icon} className='w-4' alt="" />
       </div> 
       <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='inline cursor-pointer w-3' alt="" />
    </div>
    
  ):null
}

export default SearchBar