import poster1 from "../assets/home/1.png";
import poster2 from "../assets/home/2.png";
import poster3 from "../assets/home/3.png";
import poster4 from "../assets/home/4.png";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function Posters() {
  const posters = [
    {
      image: poster1,
      tag: "ORANGE COOKIES PACK",
      title: "Brainfood Chocolate Orange Beet Cookies",
    },
    {
      image: poster2,
      tag: "BIG DISCOUNT",
      title: "Bingo Original Style Cream Onion Potato Chips",
    },
    {
      image: poster3,
      tag: "ARTIFICIAL SWEETENERS",
      title: "Waterloo Sparkling Juice Naturally Grape",
    },
    {
      image: poster4,
      tag: "ORANGE COOKIES PACK",
      title: "Absolute Holistic Freeze Dried Raw Food",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <Swiper
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {posters.map((poster, index) => (
          <SwiperSlide key={index}>
            <div className="relative overflow-hidden rounded-md group cursor-pointer">
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute top-6 left-0 right-0 px-4 text-center">
                <p className="text-xs md:text-sm font-semibold tracking-wider">
                  {poster.tag}
                </p>

                <h3 className="mt-2 text-lg md:text-xl font-medium leading-tight">
                  {poster.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Posters;