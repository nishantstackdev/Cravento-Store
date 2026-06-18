import React from 'react'
import BannerSlider from '../Sections/BannerSection'
import Posters from '../Sections/Posters'
import CategoryNav from '../Sections/CategoryNav'
import TrendingProd from '../Sections/TrendingProd'


export default function Home() {
  return (
    <>
      <BannerSlider />
      <Posters />
      <CategoryNav />
      <TrendingProd />
    </>

  )
}
