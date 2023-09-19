import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-screen w-full">
      <img
        className="left-0 top-0 h-screen w-full object-cover"
        src="https://housing.com/news/wp-content/uploads/2022/11/living-room-furniture-design-compressed-1.jpg"
        alt="/"
      />
      {/* <div className='bg-black/30 absolute top-0 left-0 w-full h-full' /> */}
      <div className="absolute top-[8rem] flex h-full w-full flex-col justify-center text-primary-0 lg:top-40">
        <div className="m-auto max-w-[1100px] p-4 md:left-[10%]">
          <h3 className="text-5xl font-bold drop-shadow-2xl md:text-5xl">
            Nội thất đơn giản
          </h3>
          <p className="max-w-[600px] py-2 text-3xl drop-shadow-2xl">
            Cho người tinh tế
          </p>
          <Link to="/product">
            <button className="bg-secondary-1 p-3 px-4 text-white hover:bg-dark-1 hover:shadow-lg">
              MUA SẮM NGAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
