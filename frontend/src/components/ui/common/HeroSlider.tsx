"use client";
import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import "swiper/css";
import "swiper/css/pagination";

interface HeroSliderProps {
  images: {
    src: StaticImageData;
    alt: string;
    onClick?: () => void;
  }[];
  height?: string; 
}
const HeroSlider: React.FC<HeroSliderProps> = ({ images, height = "500px" }) => {
   if (!images || images.length === 0) {
    return (
      <Box
        className="bg-gray-200 rounded-4xl flex items-center justify-center text-gray-500"
        sx={{ height }}
      >
        Không có banner để hiển thị
      </Box>
    );
  }

  return (
    <Box className={`relative rounded-4xl overflow-hidden w-full`} sx={{ height }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Box className="relative h-full">
              <Image
                onClick={img.onClick}
                src={img.src}
                alt={img.alt}
                fill
                sizes="100%"
                style={{ objectFit: "cover", cursor: "pointer" }}
                priority={index === 0}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlider;
