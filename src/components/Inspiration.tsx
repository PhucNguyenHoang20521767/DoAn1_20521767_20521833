import React from "react";
import { Link } from "react-router-dom";

const Inspiration = () => {
  return (
    <div className="relative m-auto mb-10 h-[600px] max-w-[1200px] px-2 pb-12">
      <img
        className="left-0 top-0 h-[600px] w-full object-cover object-top"
        src="./flowerTable.avif"
        alt="inspiration"
      />
      {/* <div className='bg-black/30 absolute top-0 left-0 w-full h-full' /> */}
      <div className="absolute left-0 top-1 flex h-full max-w-[600px] flex-col justify-center text-primary-0 max-sm:ml-[140px] md:w-full lg:left-[600px]">
        <p className="pb-5 text-2xl font-bold">GÓC CẢM HỨNG</p>
        <p className="w-full pb-3 text-xl md:max-w-[500px]">
          Bước chân vào thế giới của những mẫu thiết kế mang lại nguồn cảm hứng
          cho bạn
        </p>
        <Link to={"/blog/news"}>
          <button className="w-[200px] border-2 border-secondary-1 bg-transparent p-3 text-secondary-1 hover:shadow-lg">
            KHÁM PHÁ NGAY
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Inspiration;
