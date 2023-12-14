import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { IDiscount } from "../pages/Home/CampaignCarousel";

interface ImageSliderProps {
  slides: IDiscount[];
}

// export interface IDiscount {
//   discountThumbnail: string;
//   discountPercent: number;
//   _id: string;
//   discountName: string;
//   discountDescription?: string;
//   discountStartDate: string;
//   discountEndDate: string;
//   createdAt: string;
//   updatedAt: string;
//   index?: number;
// }

const ImageSlider = ({ slides }: ImageSliderProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <div className="max-w-80 max-h-48 min-h-[410px] min-w-[1420px] cursor-pointer overflow-hidden">
          {slides[currentIndex]?.discountThumbnail && (
            <img
              className="h-full max-h-[410px] min-h-max w-full min-w-[1480px] max-w-[1480px] transform object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
              src={slides[currentIndex].discountThumbnail}
              alt={slides[currentIndex].discountName}
              style={{ maxHeight: "600px" }}
              onClick={handleCLick}
            />
          )}
        </div>
      </div>
      <div className="absolute left-10 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="absolute right-10 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      <div className="top-4 flex justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            className="cursor-pointer text-2xl"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
