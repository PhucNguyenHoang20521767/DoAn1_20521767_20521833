import React from "react";

const Guarantee = () => {
  return (
    <div className="w-center mt-16 bg-secondary-5">
      <div className="m-auto flex max-w-[1200px] flex-wrap justify-between bg-secondary-5 px-4 py-12">
        <div className="flex flex-wrap justify-between">
          <img
            className="h-[60px] w-[60px]"
            src="https://icon-library.com/images/delivery-truck-icon-png/delivery-truck-icon-png-18.jpg"
            alt=""
          />
          <div className="pl-4">
            <p className="text-lg font-bold text-black/80">
              Giao hàng miễn phí
            </p>
            <p className="text-md text-black/60">Trong nước và quốc tể</p>
          </div>
        </div>
        <div className="mt-1 flex flex-wrap justify-between">
          <img
            className="h-[56px] w-auto"
            // src="https://cdn-icons-png.flaticon.com/512/6582/6582140.png"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_WOfvpIn1YQxm9NICpihz-n9BBT1ktn5Iw&usqp=CAU"
            alt=""
          />
          <div className="pl-4">
            <p className="text-lg font-bold text-black/80">Hỗ trợ 24/7</p>
            <p className="text-md text-black/60">Hết lòng phục vụ</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <img
            className="h-[60px] w-[60px]"
            src="https://www.iconpacks.net/icons/2/free-guarantee-icon-3598-thumb.png"
            alt=""
          />
          <div className="pl-4">
            <p className="text-lg font-bold text-black/80">Bảo hành 2 năm</p>
            <p className="text-md text-black/60">Đối với tất cả sản phẩm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guarantee;
