import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import ProductCard from '@/components/ProductItem'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const ProductSlide = () => {
  const slides = useSelector((state: RootState) => state.all.allProduct)
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
//   const currentProducts = slides.sort((a: any, b: any) => a.price - b.price);
  const sortedProducts = [...slides].sort((a: any, b: any) => a.price - b.price);
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const dotCount = Math.min(5, Math.ceil(currentProducts.length / productsPerPage));

  return (
    <div className='max-w-[1400] h-[600px] w-full m-auto pb-8 px-4 relative group'>
      <div className='grid grid-cols-5 gap-4'>
        {currentProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Left Arrow */}
      <div className='z-10 absolute top-[25%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer' style={{ transform: 'translateY(-50%)' }}>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className='z-10 absolute top-[25%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer' style={{ transform: 'translateY(-50%)' }}>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      <div className='flex top-4 justify-center py-2'>
        {currentProducts.map((slide, slideIndex) => (
          <div
            className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-black' : 'text-gray-400'}`}
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

export default ProductSlide;