import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import NewArrivals from '../components/NewArrivals'
import OurPolicy from '../components/OurPolicy'
import NewzLetter from '../components/NewzLetter'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <NewArrivals/>
      <OurPolicy/>
      <NewzLetter/>
    </div>
  )
}

export default Home