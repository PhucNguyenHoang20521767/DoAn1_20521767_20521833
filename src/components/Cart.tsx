import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { mainApi } from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";
import {
  createCart,
  getCustomerCart,
  getAllCartItem,
  updateItemInCart,
  removeItemFromCart,
  getProductById,
  getProductColor,
  getProductColorById,
  getAllProductImageUrlByColor,
  getProductImagesUrl,
  getDiscountById,
} from "@/api/api_function";
import ManySkeleton from "./loaders/manySkeleton";
import { set } from "react-hook-form";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import NumberInputCart from "@/components/customs/NumberInputCart";
import { CircularProgress } from "@mui/material";
import { loadCartItems } from "@/redux/reducers/cartItem_reducers";

import SuccessNotify from "@/components/customs/SuccessNotify";
import ErrorNotify from "@/components/customs/ErrorNotify";
import { notify } from "@/redux/reducers/notify_reducers";
import CartItemComponent from "./CartDetail";

interface Color {
  _id: string;
  colorName: string;
  colorHex: string;
  productId: string;
  colorId: string;
  productQuantity: number;
}

interface CartItem {
  _id: string;
  productId: string;
  productColorId: string;
  productQuantity: number;
  cartId: number;
  productPrice: number;
  productDiscount: number;
  productSalePrice: number;
}

interface ICartState {
  cartItems: CartItem[];
}

interface CartItemProps {
  cartItem: CartItem;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CartProps {
  isCart: boolean;
}

export const Cart = ({ isCart }: CartProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isDeleted = useSelector((state: RootState) => state.cartItem.isDeleted);
  const currentCart = useSelector((state: RootState) => state.cart);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    setCartItems([]);
    // setPageLoading(true)
  }, [isDeleted]);

  const getCartItemsDetail = async (item: CartItem[]) => {
    item.map(async (cartItem: CartItem) => {
      const fetchProductDetails = async () => {
        const res = await getProductById(cartItem.productId);
        return res.data.data;
      };

      const fetchColorDetails = async () => {
        const colorRes = await getProductColorById(cartItem.productColorId);
        return colorRes.data.color;
      };

      const fetchImageUrls = async () => {
        const res = await getAllProductImageUrlByColor(
          cartItem.productId,
          cartItem.productColorId
        );
        const productImageUrls = res.data.data;
        return productImageUrls.map(
          (productImageUrl: any) => productImageUrl.imageURL
        );
      };

      const fetchDiscountDetails = async (product: any) => {
        if (product.productDiscountId) {
          const productDiscountRes = await getDiscountById(
            product.productDiscountId
          );
          return productDiscountRes.data.data;
        }
        return null;
      };

      const product = await fetchProductDetails();
      const color = await fetchColorDetails();
      const imageUrls = await fetchImageUrls();
      const discount = await fetchDiscountDetails(product);

      setCartItems((prevCartItems) => {
        const tempCartItems = prevCartItems.map((item: CartItem) => {
          if (item._id === cartItem._id) {
            return {
              ...item,
              productPrice: product.productPrice,
              productDiscount: discount.discountPercent,
              productSalePrice: product.productPrice,
              productColor: color,
              productImageUrls: imageUrls,
            };
          }
          return item;
        });
        return tempCartItems;
      });
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res1 = await getCustomerCart(currentUser);
        const cartInfores = res1.data.data;
        setCart(cartInfores);
        // console.log('cart', cart)

        if (cartInfores.length > 0) {
          const res2 = await getAllCartItem(cartInfores[0]._id, currentUser);
          const returnData = res2.data.data;
          getCartItemsDetail(returnData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      fetchCart();
    }
  }, [currentUser]);

  useEffect(() => {
    if (cart.length > 0) {
      dispatch(loadCartItems({ cartItems: cartItems, isDeleted: false }));
    }
  }, [cartItems]);

  if (!currentUser) {
    return (
      <div className="my-[10rem] p-5 text-xl">
        Vui lòng đăng nhập để xem giỏ hàng!
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="my-[10rem] flex justify-center p-5 text-xl">
        Giỏ hàng trống!
      </div>
    );
  }

  return (
    <>
      {/* cartDetail */}
      {cartItems.map((cartItem: CartItem) => (
        <div key={cartItem.productColorId} className="mb-2">
          <CartItemComponent
            key={cartItem.productColorId}
            cartItem={cartItem}
            setCartItems={setCartItems}
            setChange={setChange}
          />
        </div>
      ))}
      {/* button */}
      <div className="flex justify-center">
        {currentUser && isCart && (
          <Link to={"cart"}>
            <button
              className={
                "m-2 rounded-sm bg-primary-1 p-2 px-16 uppercase text-white hover:bg-black hover:shadow-lg"
              }
            >
              Thanh toán ngay
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Cart;
