import { useEffect, useState } from "react";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/20/solid";
import ProductCard from "@/components/ProductItem";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const ProductSlide = ({ product }: any) => {
  const slides = useSelector((state: RootState) => state.all.allProduct);
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

  const productsPerPage = 5;
  const startIndex = currentIndex * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = slides
    .filter((slide: any) => slide.category_id === product.productCategoryId)
    .slice(startIndex, endIndex);

  const dotCount = Math.min(
    5,
    Math.ceil(currentProducts.length / productsPerPage)
  );

  return (
    <div className="group relative m-auto h-[600px] w-full max-w-[1400] px-4 pb-8">
      <div className="grid grid-cols-5 gap-4">
        {currentProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Left Arrow */}
      <div
        className="absolute left-5 top-[25%] z-10 -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20"
        style={{ transform: "translateY(-50%)" }}
      >
        <ArrowLeftCircleIcon
          onClick={prevSlide}
          className="h-8 w-8 text-gray-500"
        />
      </div>

      {/* Right Arrow */}
      <div
        className="absolute right-5 top-[25%] z-10 -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20"
        style={{ transform: "translateY(-50%)" }}
      >
        <ArrowRightCircleIcon
          onClick={prevSlide}
          className="h-8 w-8 text-gray-500"
        />
      </div>

      <div className="top-4 flex justify-center py-2">
        {[...Array(dotCount)].map((_, dotIndex) => (
          <div
            className={`cursor-pointer text-2xl ${
              dotIndex === currentIndex ? "text-black" : "text-gray-400"
            }`}
            key={dotIndex}
            onClick={() => goToSlide(dotIndex)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              key={dotIndex}
            >
              <circle cx="20" cy="20" r="6" fill="#71797E" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlide;
