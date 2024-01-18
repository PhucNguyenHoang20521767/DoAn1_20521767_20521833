import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { CartItem } from "./cartOrder";

interface Color {
  _id: string;
  colorName: string;
  colorHex: string;
  productId: string;
  colorId: string;
  productQuantity: number;
}

interface CartItemProps {
  cartItem: CartItem;
}

const CartItemComponent = ({ cartItem }: CartItemProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(cartItem.productSalePrice * cartItem.productQuantity);
  }, [cartItem.productQuantity, cartItem.productSalePrice]);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          {/* <img 
            key={cartItem.productColorId}
            src={imageUrls[0]} 
            alt={product?.productName} 
            className='w-16 h-16 object-contain'
            /> */}
          <LazyLoadImage
            key={cartItem.productColorId}
            className="h-16 w-32 object-contain"
            alt={cartItem?.productName}
            height={32}
            src={cartItem?.productImageUrls ? cartItem.productImageUrls[0] : ""}
            width={16}
            onError={(e: any) => {
              e.currentTarget.src =
                "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
            }}
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
          {/* <Link to={`collection/${cartItem.productId}`}>
              <button 
              className='text-dark-3'
              onClick={() => {navigate(`/collection/${cartItem.productId}`)}}
              >
                Xem
              </button>
            {/* </Link> */}
          <div>
            <div className="font-bold">{cartItem?.productName}</div>
            <div className="flex">
              <div className="font-bold">Màu:</div>
              <div className="ml-1">
                {cartItem?.productColor ? cartItem?.productColor.colorName : ""}
              </div>
              <div className="ml-2 flex items-center">
                <span
                  className={`mr-2 inline-block h-4 w-4 rounded-full bg-${cartItem?.productColor?.colorHex}`}
                  style={{ backgroundColor: cartItem?.productColor?.colorHex }}
                />
              </div>
            </div>
            {/* <div className='flex'>
              <div className='font-bold'>
                Số lượng: 
              </div>
              <div className='ml-1'>
                {cartItem.productQuantity}
              </div>
            </div> */}
            <div className="flex items-center gap-2">
              <div className="font-bold">Giá: </div>
              <div>
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold">Số lượng: </div>
              <p>{cartItem.productQuantity}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemComponent;
