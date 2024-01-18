import React from "react";
import { Link } from "react-router-dom";

const Room = () => {
  return (
    <div className="item-center m-auto flex max-w-[700px] px-2 pb-12 sm:flex-wrap sm:justify-between">
      <Link to={"product/living-room"}>
        <div className="text-center">
          <img
            className="h-[200px] w-[150px] object-cover shadow-lg"
            src="livingHome.webp"
            alt="livingHome"
          />
          <p className="text-lg font-bold text-dark-1">Phòng khách</p>
        </div>
      </Link>
      <Link to={"product/kitchen"}>
        <div className="text-center">
          <img
            className="h-[200px] w-[150px] object-cover shadow-lg"
            src="./kitchenHome.webp"
            alt="kitchenHome"
          />
          <p className="text-lg font-bold text-dark-1">Nhà bếp</p>
        </div>
      </Link>
      <Link to={"product/bedroom"}>
        <div className="text-center">
          <img
            className="h-[200px] w-[150px] object-cover shadow-lg"
            src="bedHome.webp"
            alt="bedHome"
          />
          <p className="text-lg font-bold text-dark-1">Phòng ngủ</p>
        </div>
      </Link>
    </div>
  );
};

export default Room;
