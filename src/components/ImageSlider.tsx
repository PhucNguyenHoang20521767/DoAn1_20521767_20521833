import React, { useState, useEffect } from "react";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const ImageSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useSelector(
    (state: RootState) => state.discount.currentDiscount
  );

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentIndex(slideIndex);
  };

  const handleCLick = () => {
    navigate(`/product/discount/${slides[currentIndex]._id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="group relative m-auto h-full max-h-[600px] w-full px-4 pb-8">
      <div className="flex items-center justify-center">
        <div className="max-w-80 max-h-48 cursor-pointer overflow-hidden md:min-h-[410px] md:min-w-[1420px]">
          {slides[currentIndex]?.discountThumbnail && (
            <img
              className="h-full max-h-[410px] min-h-max w-full transform object-cover object-left transition-transform duration-1000 ease-in-out hover:scale-110 md:min-w-[1480px] md:max-w-[1480px]"
              src={slides[currentIndex].discountThumbnail}
              alt={slides[currentIndex].discountName}
              style={{ maxHeight: "600px" }}
              onClick={handleCLick}
            />
          )}
        </div>
      </div>
      <div className="absolute left-10 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20">
        <ArrowLeftCircleIcon
          onClick={prevSlide}
          className="h-8 w-8 text-gray-500"
        />
      </div>
      <div className="absolute right-10 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20">
        <ArrowRightCircleIcon
          onClick={nextSlide}
          className="h-8 w-8 text-gray-500"
        />
      </div>

      <div className="top-4 flex justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            className="cursor-pointer text-2xl"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
              <circle cx="20" cy="20" r="6" fill="#71797E" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
