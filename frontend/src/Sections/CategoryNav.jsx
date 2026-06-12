import React, { useEffect, useState } from "react";
import { GetCategories } from "../api/AllApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";

export default function CategoryNav() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);

        const response = await GetCategories();
        const Categoryresponse = response.allCategories;

        if (response && Categoryresponse) {
          setCategories(Categoryresponse);
        } else if (Array.isArray(response)) {
          setCategories(response);
        } else if (response?.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        Loading...
      </div>
    );
  }

  return (
    <nav className="w-full bg-white font-sans">
      {/* Green Header */}
      <div className="h-24 w-full bg-[#00875A]" />

      <div className="mx-auto max-w-7xl px-4 -mt-14">

        <Swiper
          modules={[Grid]}
          spaceBetween={20}

          breakpoints={{
            0: {
              slidesPerView: 4,
              grid: {
                rows: 2,
                fill: "row",
              },
            },

            768: {
              slidesPerView: 5,
              grid: {
                rows: 1,
              },
            },

            1024: {
              slidesPerView: 7,
              grid: {
                rows: 1,
              },
            },

            1400: {
              slidesPerView: 8,
              grid: {
                rows: 1,
              },
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="flex flex-col items-center text-center py-4 group cursor-pointer">

                <div
                  className="
                  aspect-square
                  w-20
                  md:w-28
                  lg:w-32
                  rounded-full
                  border
                  border-gray-100
                  bg-white
                  p-3
                  shadow-md
                  flex
                  items-center
                  justify-center
                  transition
                  duration-300
                  group-hover:scale-105
                "
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${category.image}`}
                    alt={category.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <span className="mt-3 text-xs md:text-sm lg:text-base font-semibold text-gray-900 group-hover:text-[#00875A]">
                  {category.name}
                </span>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </nav>
  );
}