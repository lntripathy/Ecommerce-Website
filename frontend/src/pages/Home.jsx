import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular Watches"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Best Mobile Phones"}/>
    </>
  )
}

export default Home
