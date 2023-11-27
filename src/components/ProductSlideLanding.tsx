import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import ProductCard from "@/components/ProductItem";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const ProductSlide = () => {
  const slides = useSelector((state: RootState) => state.all.allProduct);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(5);

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
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setProductsPerPage(2);
      } else if (windowWidth < 1024) {
        setProductsPerPage(3);
      } else {
        setProductsPerPage(5);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const productsPerPage = 5;
  const startIndex = currentIndex * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  //   const currentProducts = slides.sort((a: any, b: any) => a.price - b.price);
  const sortedProducts = [...slides].sort(
    (a: any, b: any) => a.price - b.price
  );
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const dotCount = Math.min(
    5,
    Math.ceil(currentProducts.length / productsPerPage)
  );

  return (
    <div className="group relative m-auto h-[600px] w-full max-w-[1400] px-4 pb-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {currentProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Left Arrow */}
      <div
        className="absolute left-5 top-[25%] z-10 -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20"
        style={{ transform: "translateY(-50%)" }}
      >
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div
        className="absolute right-5 top-[25%] z-10 -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl text-white group-hover:bg-black/20"
        style={{ transform: "translateY(-50%)" }}
      >
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      <div className="top-4 flex justify-center py-2">
        {currentProducts.map((slide, slideIndex) => (
          <div
            className={`cursor-pointer text-2xl ${
              slideIndex === currentIndex ? "text-black" : "text-gray-400"
            }`}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled key={slideIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlide;
