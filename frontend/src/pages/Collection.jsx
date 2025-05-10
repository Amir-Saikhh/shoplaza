import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { products ,search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let productCopy = products.slice();

    if (search && showSearch) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productCopy)
  };
  const sortProduct = () => {
    let fpCopy = filterProducts.slice()
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
        break
        case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
          applyFilter();
          break;
    }
  }
  
  useEffect(() => {
    applyFilter();
  }, [category, subCategory,search , showSearch,products]
);

  useEffect(()=>{
    sortProduct()
      },[sortType]
    )
    

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter section */}
      <div className="min-w-60">
        <p data-aos="fade-up" data-aos-duration="600"
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center my-2 text-xl cursor-pointer gap-2 font-prata"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden transform transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            alt="dropdown"
          />
        </p>

        {/* Category Filter */}
        <div data-aos="fade-left" data-aos-duration="600"
          className={`${
            showFilter ? "block" : "hidden"
          } sm:block border border-gray-300 pl-5 py-3 mt-6 mb-5`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label htmlFor="Men">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Men"}
                  id="Men"
                  onChange={toggleCategory}
                />{" "}
                Men
              </p>
            </label>
            <label htmlFor="Women">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Women"}
                  id="Women"
                  onChange={toggleCategory}
                />{" "}
                Women
              </p>
            </label>
            <label htmlFor="Kids">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Kids"}
                  id="Kids"
                  onChange={toggleCategory}
                />{" "}
                Kids
              </p>
            </label>
          </div>
        </div>

        {/* sub category Filter */}
        <div data-aos="fade-right" data-aos-duration="600"
          className={`${
            showFilter ? "block" : "hidden"
          } sm:block border border-gray-300 pl-5 py-3 mb-10`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label htmlFor="Topwear">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Topwear"}
                  id="Topwear"
                  onChange={toggleSubCategory}
                />{" "}
                Topwear
              </p>
            </label>
            <label htmlFor="Bottomwear">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Bottomwear"}
                  id="Bottomwear"
                  onChange={toggleSubCategory}
                />{" "}
                Bottomwear
              </p>
            </label>
            <label htmlFor="Winterwear">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Winterwear"}
                  id="Winterwear"
                  onChange={toggleSubCategory}
                />{" "}
                Winterwear
              </p>
            </label>
          </div>
        </div>
      </div>
      {/* right side  */}
      <div className="flex-1 mb-10">
        <div className="flex justify-between text-base sm:text-xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* product sort  */}
          <select data-aos="fade-down" data-aos-duration="600" onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 rounded cursor-pointer px-2 text-sm bg-white">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products  */}
        <div  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
