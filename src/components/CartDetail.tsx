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

interface CartItemProps {
  cartItem: CartItem;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartItemComponent = ({
  cartItem,
  setCartItems,
  setChange,
}: CartItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCart = useSelector((state: RootState) => state.cart);
  const _cartItems = useSelector(
    (state: RootState) => state.cartItem.cartItems
  );
  const isDeleted = useSelector((state: RootState) => state.cartItem.isDeleted);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [product, setProduct] = useState<any>(null);
  const [listColor, setListColor] = useState<Color[]>([]);
  const [color, setColor] = useState<Color | null>(null);
  const [chooseColor, setChooseColor] = useState<Color | null>(null);
  const [quantity, setQuantity] = useState<number>(cartItem.productQuantity);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountNotExpired, setDiscountNotExpired] = useState<boolean>(true);
  const [priceLoading, setPriceLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [discountDetail, setDiscountDetail] = useState<any>(null);
  const [Open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const discountFailed = () => {
    setDiscountNotExpired(false);
    setDiscount(0);
    setPriceLoading(false);
  };

  const handlePrice = async (tempPrice: number) => {
    if (discountNotExpired && product && product.productPrice) {
      const newPrice = (tempPrice * (100 - discount)) / 100;
      setPrice(newPrice);
      // console.log('newPrice', newPrice)

      setCartItems((prevCartItems) => {
        const tempCartItems = prevCartItems.map((item: CartItem) => {
          if (item._id === cartItem._id) {
            return { ...item, productSalePrice: newPrice };
          }
          return item;
        });
        return tempCartItems;
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      // try {
      const res3 = await getProductById(cartItem.productId);
      const product = res3.data.data;
      setProduct(product);
      setPrice(product.productPrice);

      setCartItems((prevCartItems) => {
        const tempCartItems = prevCartItems.map((item: CartItem) => {
          if (item._id === cartItem._id) {
            return { ...item, productPrice: product.productPrice };
          }
          return item;
        });
        return tempCartItems;
      });

      // const imageRes = await getProductImagesUrl(cartItem.productId)
      // const productImages = imageRes.data.data
      // const theImageUrls = productImages.map((productImage: any) => productImage.imageURL);
      // console.log('theImageUrls', theImageUrls)
      // setImageUrls(theImageUrls);

      // const res4 = await getProductColor(cartItem.productId)
      // const productColor = res4.data.data
      // console.log('productColor', productColor)
      // console.log('cartItem', cartItem)

      const colorRes = await getProductColorById(cartItem.productColorId);
      const _color = colorRes.data.color;
      setColor(_color);
      // console.log('_color', _color._id)
      // console.log('color', color)

      const res5 = await getAllProductImageUrlByColor(
        cartItem.productId,
        cartItem.productColorId
      );
      const productImageUrls = res5.data.data;
      const _imageUrls = productImageUrls.map(
        (productImageUrl: any) => productImageUrl.imageURL
      );
      setImageUrls(_imageUrls);
      // console.log('productImageUrls', productImageUrls)
      // console.log('_imageUrls', _imageUrls)

      // const listColor = await Promise.all(productColor.map(async (color: any) => {
      //   const listColorRes = await getProductColorById(color._id)
      //   const listColor = listColorRes.data.color
      //   // console.log('listColor1', listColor)
      //   return { ...color, ...listColor, colorId: color._id }
      // }))

      setColor(_color);
      if (product.productDiscountId) {
        const productDiscountRes = await getDiscountById(
          product.productDiscountId
        );
        const productDiscount = productDiscountRes.data.data;
        const errorDiscount = productDiscountRes.data.success;
        // console.log('errordiscount', error)
        // console.log('productDiscount', productDiscount)
        if (
          productDiscount &&
          new Date(productDiscount.discountEndDate) > new Date()
        ) {
          setDiscount(productDiscount.discountPercent);
          setDiscountNotExpired(true);
          handlePrice(product.productPrice);
          setDiscountDetail(productDiscount);
          // console.log('productDiscount', productDiscount)

          setCartItems((prevCartItems) => {
            const tempCartItems = prevCartItems.map((item: CartItem) => {
              if (item._id === cartItem._id) {
                return {
                  ...item,
                  productPrice: product.productPrice,
                  productDiscount: productDiscount.discountPercent,
                };
              }
              return item;
            });
            return tempCartItems;
          });

          // const tempCartItems = _cartItems.map((item: CartItem) => {
          //   if (item._id === cartItem._id) {
          //     return { ...item, productPrice: product.productPrice, productDiscount: productDiscount.discountPercent }
          //   }
          //   return item
          // })
          // dispatch(loadCartItems({cartItems: tempCartItems}))
        } else {
          discountFailed();
        }

        if (errorDiscount) {
          discountFailed();
        }
      } else {
        discountFailed();
      }
      // }
      // catch (error) {
      //   console.log(error);
      // }

      if (new Date(discountDetail?.discountEndDate) > new Date()) {
        const tempCartItems = _cartItems.map((item: CartItem) => {
          if (item._id === cartItem._id) {
            return {
              ...item,
              productPrice: product.productPrice,
              productDiscount: 0,
            };
          }
          return item;
        });
        // if (isDeleted === false) {
        dispatch(loadCartItems({ cartItems: tempCartItems, isDeleted: false }));
        // }
      }
    };

    if (currentUser) {
      fetchProduct();
    }
  }, [currentUser]);

  useEffect(() => {
    if (cartItem.productQuantity > product?.productQuantity) {
      handleRemoveItemFromCart();
      dispatch(
        notify({
          isSuccess: false,
          isError: true,
          isInfo: false,
          message:
            "Số lượng vài sản phẩm trong giỏ hàng vượt quá số lượng sản phẩm hiện có",
        })
      );
    }
  }, [product]);

  useEffect(() => {
    if (discount) {
      handlePrice(product.productPrice);
    }

    setPriceLoading(false);
  }, [discount]);

  useEffect(() => {
    if (product) {
      setTotalPrice(price * quantity);
    }
  }, [product, quantity, discount, price]);

  if (!product) {
    return <ManySkeleton />;
  }

  // const color = listColor.find((c: Color) => c._id === cartItem.productColorId)
  const imageUrl = imageUrls[0];
  const handleColorClick = (color: Color) => {
    setChooseColor(color);
  };

  const handleRemoveItemFromCart = async () => {
    try {
      const res = await removeItemFromCart(
        currentCart._id,
        currentUser,
        cartItem.productId,
        cartItem.productColorId
      );
      setCartItems((prevCartItems) =>
        prevCartItems.filter(
          (item) => item.productColorId !== cartItem.productColorId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItemFromCart = async () => {
    const cartRes = await updateItemInCart(
      currentCart._id,
      currentUser,
      cartItem.productId,
      cartItem.productColorId,
      quantity
    );
    const cart = cartRes.data.data;

    setCartItems((prevCartItems) => {
      const tempCartItems = prevCartItems.map((item: CartItem) => {
        if (item._id === cartItem._id) {
          return { ...item, productQuantity: quantity };
        }
        return item;
      });
      return tempCartItems;
    });
    handlePrice(product.productPrice);
  };

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
            alt={product?.productName}
            height={32}
            src={imageUrls[0]}
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
            <div className="font-bold">{product?.productName}</div>
            <div className="flex">
              <div className="font-bold">Màu:</div>
              <div className="ml-1">{color?.colorName}</div>
              <div className="ml-2 flex items-center">
                <span
                  className={`mr-2 inline-block h-4 w-4 rounded-full bg-${color?.colorHex}`}
                  style={{ backgroundColor: color?.colorHex }}
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
            <div>
              {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 text-xl text-red-700">
          {/* ... */}
          <div className="flex h-full items-center px-2 py-4">
            <button
              key={cartItem.productColorId}
              onClick={handleRemoveItemFromCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 flex items-center justify-center">
        <NumberInputCart
          value={quantity}
          onChange={setQuantity}
          cartItem={cartItem}
          cartItems={_cartItems}
          setCartItems={setCartItems}
          product={product}
          setPrice={setPrice}
          setChange={setChange}
        />
        {/* <div className=''>
            <button 
            key={cartItem.productColorId}
            onClick={() => handleUpdateItemFromCart()}
            className={`w-full px-3 py-1 text-white bg-primary-1 border rounded-sm border-secondary-1 
            hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
            `}>
                Xác nhận
            </button>
        </div> */}
      </div>
    </>
  );
};

export default CartItemComponent;
