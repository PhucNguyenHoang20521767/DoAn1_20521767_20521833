import React from "react";

const Inspiration = () => {
  return (
    <div className="relative m-auto mb-10 h-[600px] max-w-[1200px] px-2 pb-12">
      <img
        className="left-0 top-0 h-[600px] w-full object-cover object-top"
        src="https://img.freepik.com/free-photo/beautiful-flowers-table_23-2147755188.jpg?w=996&t=st=1683019970~exp=1683020570~hmac=3a55d97e73e780789b88684feef78447419d4d5c61fd10ff04063951df84b0d0"
        alt="/"
      />
      {/* <div className='bg-black/30 absolute top-0 left-0 w-full h-full' /> */}
      <div className="absolute top-1 flex h-full w-full max-w-[600px] flex-col justify-center text-primary-0 max-sm:left-[120px] lg:left-[600px]">
        <p className="pb-5 text-2xl font-bold">GÓC CẢM HỨNG</p>
        <p className="max-w-[500px] pb-3 text-xl">
          Bước chân vào thế giới của những mẫu thiết kế mang lại nguồn cảm hứng
          cho bạn
        </p>
        <button className="w-[200px] border-2 border-secondary-1 bg-transparent p-3 text-secondary-1 hover:shadow-lg">
          KHÁM PHÁ NGAY
        </button>
      </div>
    </div>
  );
};

export default Inspiration;
