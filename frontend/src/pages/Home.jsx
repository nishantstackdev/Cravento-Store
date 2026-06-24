import React from 'react'
import BannerSlider from '../Sections/BannerSection'
import Posters from '../Sections/Posters'
import CategoryNav from '../Sections/CategoryNav'
import TrendingProd from '../Sections/TrendingProd'
import DealOfTheDay from '../Sections/DealOfTheDay'
import Subposters from '../Sections/Subposters'
import VideoReviews from '../Sections/videoReviews'


export default function Home() {
  return (
    <>
      <BannerSlider />
      <Posters />
      <CategoryNav />
      <TrendingProd />
      <DealOfTheDay />
      <Subposters />
      <VideoReviews />
    </>

  )
}
