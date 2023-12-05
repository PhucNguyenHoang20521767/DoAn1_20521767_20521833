import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

// const slidesArray = [
//   {
//     url: "/sheft_tv.jpg",
//     title: "Save30",
//   },
//   {
//     url: "/save_40.webp",
//     title: "Save40",
//   },
//   {
//     url: "/video.gif",
//     title: "Tree",
//   },
//   {
//     url: "https://images.pexels.com/photos/313776/pexels-photo-313776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     title: "Phucdeptrai",
//   },
// ];

interface Slide {
  url: string;
  title: string;
  id: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const ImageSlider = ({ slides }: ImageSliderProps) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="group relative m-auto h-[600px] w-full max-w-[1400] px-4 pb-8">
      {/* <div
        className="h-full w-full bg-cover bg-center object-contain duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div> */}
      <div className="flex items-center justify-center">
        <div
          className="max-w-80 max-h-48 min-h-[560px] w-1/3 min-w-[1480px] cursor-pointer overflow-hidden"
          // onClick={() => {
          //   navigate(`/blog/content/${blogPost._id}`);
          // }}
        >
          <LazyLoadImage
            className="object-cover"
            height={560}
            width={1480}
            alt="Title image"
            src={slides[currentIndex].url}
            effect="black-and-white"
            visibleByDefault={slides[currentIndex].url === "/hero.webp"}
            wrapperProps={{
              // If you need to, you can tweak the effect transition using the wrapper style.
              style: { transitionDelay: "1s" },
            }}
            style={{ transition: "transform 0.8s ease" }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
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
