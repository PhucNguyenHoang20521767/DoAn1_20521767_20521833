import { RootState } from "@/redux/store/store";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const product_item = () => {
  const { discountId } = useParams<{ discountId: string }>();
  const currentDiscount = useSelector(
    (state: RootState) => state.discount.currentDiscount
  );
  // const [images, setImages] = useState<string[]>([]);
  const images = useRef<string>("./tree_banner.webp");

  currentDiscount.forEach((discount) => {
    if (discount._id === discountId) {
      images.current = discount?.discountThumbnail;
    }
  });

  return (
    <>
      {discountId && (
        <div className="my-8">
          <img
            src={images.current}
            alt="Banner"
            className=" h-auto w-full object-cover"
          />
        </div>
      )}
    </>
  );
};

export default product_item;

export const product_itemLoader = () => {
  return import(/* webpackChunkName: "product_item" */ "./product_item");
};
