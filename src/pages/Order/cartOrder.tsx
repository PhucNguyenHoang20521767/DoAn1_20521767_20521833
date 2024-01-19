import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
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
  getAllValidVouchers,
} from "@/api/api_function";
import { loadCartItems } from "@/redux/reducers/cartItem_reducers";
import CartItemComponent from "@/components/CartDetail";
import VoucherModal from "@/components/modals/voucherModal";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { styleButtonOutlined } from "@/utils/ui";

interface Color {
  _id: string;
  colorName: string;
  colorHex: string;
  productId: string;
  colorId: string;
  productQuantity: number;
}

export interface CartItem {
  _id: string;
  productId: string;
  productName?: string;
  productColorId: string;
  productQuantity: number;
  cartId: number;
  productPrice: number;
  productDiscount: number;
  productSalePrice: number;
  productImageUrls?: string[];
  productColor?: Color;
}

interface ICartState {
  cartItems: CartItem[];
}

interface CartItemProps {
  currentVoucher: VoucherInter | null;
  setCurrentVoucher: React.Dispatch<React.SetStateAction<VoucherInter | null>>;
}

export interface VoucherInter {
  _id: string;
  voucherValue: number;
  minOrderPrice: number;
  maxDiscountPrice: number;
  isActive: boolean;
  voucherType: string;
  voucherEndDate: string;
}

export const CartOrder = ({
  currentVoucher,
  setCurrentVoucher,
}: CartItemProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isDeleted = useSelector((state: RootState) => state.cartItem.isDeleted);
  const _cartItems = useSelector(
    (state: RootState) => state.cartItem.cartItems
  );
  const currentCart = useSelector((state: RootState) => state.cart);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadCart, setLoadCart] = useState<boolean>(false);
  const [price, setPrice] = useState(0);
  const ship = 30000;
  const [totalPrice, setTotalPrice] = useState(price + ship);
  const [change, setChange] = useState<boolean>(false);
  const [vouchers, setVouchers] = useState<VoucherInter[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    setCartItems([]);
    // setPageLoading(true)
  }, [isDeleted]);

  const handleReload = () => {
    setReload(true);
  };

  const getCartItemsDetail = async (cartInfor: CartItem[]) => {
    cartInfor.map(async (cartItem: CartItem) => {
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
          console.log(
            "discount productDiscountRes",
            productDiscountRes.data.data
          );
          return productDiscountRes.data.data;
        }
        return null;
      };

      const product = await fetchProductDetails();
      const color = await fetchColorDetails();
      const imageUrls = await fetchImageUrls();
      const discount = await fetchDiscountDetails(product);
      console.log("discount discount", discount);

      setCartItems((prev) => {
        const tempCartItems = prev.map((item: CartItem) => {
          if (item._id === cartItem._id) {
            return {
              ...item,
              productPrice: product.productPrice,
              productName: product.productName,
              // productDiscount: discount.discountPercent,
              productSalePrice: product.productPrice,
              productColor: color,
              productImageUrls: imageUrls,
            };
          }
          return item;
        });
        return tempCartItems;
      });
      setLoadCart(false);
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoadCart(true);
      try {
        const res1 = await getCustomerCart(currentUser);
        const cartInfores = res1.data.data;
        setCart(cartInfores);
        // console.log('cart', cart)

        if (cartInfores.length > 0) {
          const res2 = await getAllCartItem(cartInfores[0]._id, currentUser);
          const returnData = res2.data.data;
          setCartItems(returnData);
          getCartItemsDetail(returnData);
        }
      } catch (error) {
        console.log(error);
        setLoadCart(false);
      }
    };
    if (currentUser) {
      fetchCart();
      setLoadCart(false);
    }
  }, [currentUser, reload]);

  useEffect(() => {
    if (cart.length > 0 && cartItems.length > 0) {
      dispatch(loadCartItems({ cartItems: cartItems, isDeleted: false }));
    }
  }, [loadCart, cartItems]);

  useEffect(() => {
    if (cartItems) {
      setPrice(
        cartItems.reduce((total: number, item: CartItem) => {
          if (item.productSalePrice) {
            return total + item.productSalePrice * item.productQuantity;
          }
          return total + item.productPrice * item.productQuantity;
        }, 0)
      );
    }
  }, [cartItems, dispatch, _cartItems, change]);

  useEffect(() => {
    if (currentVoucher && currentVoucher.voucherType === "PERCENT") {
      setPrice(price - (price * currentVoucher.voucherValue) / 100);
    }
    if (currentVoucher && currentVoucher.voucherType === "MONEY") {
      setPrice(price - currentVoucher.voucherValue);
    }
  }, [currentVoucher]);

  useEffect(() => {
    setTotalPrice(price + ship);
  }, [price]);

  useEffect(() => {
    const fetchVoucher = async () => {
      const res = await getAllValidVouchers(currentUser);
      setVouchers(res.data.data);
    };
    if (currentUser) fetchVoucher();
  }, [currentUser]);

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

      <div className="m-8">
        <div className="flex w-full items-center justify-between pt-8">
          {currentVoucher ? (
            <p className="max-w-[16rem] text-xl text-gray-700">
              Bạn đã được giảm{" "}
              {`${currentVoucher?.voucherValue}` +
                `${currentVoucher?.voucherType === "PERCENT" ? "%" : "đ"}`}
              , chọn voucher:{" "}
            </p>
          ) : (
            <p className="text-xl text-gray-700">Chọn voucher: </p>
          )}
          <Button
            variant="text"
            sx={styleButtonOutlined}
            onClick={() => setOpenModal(true)}
          >
            Chọn voucher
          </Button>
        </div>
        <div className="flex justify-between">
          <span className="text-xl text-gray-700">Giá tạm tính:</span>
          <span className="text-xl text-gray-700">
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xl text-gray-700">Phí ship:</span>
          <span className="text-xl text-gray-700">
            {ship.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <hr className="mb-4 border text-dark-0" />
        <div className="flex justify-between">
          <span className="text-xl text-gray-700">Tổng tiền:</span>
          <span className="text-xl text-gray-700">
            {totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadCart}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <VoucherModal
        vouchers={vouchers}
        currentVoucher={currentVoucher}
        setCurrentVoucher={setCurrentVoucher}
        open={openModal}
        setOpen={setOpenModal}
        handleReload={handleReload}
        price={price}
        setPrice={setPrice}
      />
    </>
  );
};

export default CartOrder;
