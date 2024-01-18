import React from "react";
import { updateItemInCart } from "@/api/api_function";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { notifyError } from "@/redux/reducers/notify_reducers";

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

interface Props {
  value: number;
  onChange: (value: number) => void;
  cartItem: CartItem;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const NumberInputCart: React.FC<Props> = ({
  value,
  onChange,
  cartItem,
  cartItems,
  setCartItems,
  setChange,
  product,
  setPrice,
}) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const currentCart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateItemInCart = async (newQuantity: number) => {
    const cartRes = await updateItemInCart(
      currentCart._id,
      currentUser,
      cartItem.productId,
      cartItem.productColorId,
      newQuantity
    );

    setCartItems((prevCartItems) => {
      const tempCartItems = prevCartItems.map((item: CartItem) => {
        if (item._id === cartItem._id) {
          return { ...item, productQuantity: newQuantity };
        }
        return item;
      });
      return tempCartItems;
    });

    setChange((prevChange) => !prevChange);
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      onChange(newValue);
      handleUpdateItemInCart(newValue);
    }
  };

  const handleIncrement = () => {
    if (value >= product.productQuantity) {
      onChange(product.productQuantity);
      dispatch(notifyError("Số lượng sản phẩm không đủ"));
      return;
    }

    onChange(value + 1);
    handleUpdateItemInCart(value + 1);
  };

  const handleDecrement = () => {
    // value >=1
    if (value <= 1) {
      onChange(1);
      return;
    }
    onChange(value - 1);
    handleUpdateItemInCart(value - 1);
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <button
        className="border-gray-300 px-3 pb-1 text-3xl"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        className="w-16 border border-secondary-0 px-2 py-1 text-center"
        value={value}
        onChange={handleInputChange}
      />
      <button
        className="border-gray-300 px-2 pb-1 text-3xl"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default NumberInputCart;
