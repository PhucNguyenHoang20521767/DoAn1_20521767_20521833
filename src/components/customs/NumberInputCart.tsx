import React, { useState } from 'react';
import { createCart, 
    getCustomerCart, 
    getAllCartItem, 
    updateItemInCart,
    removeItemFromCart,
    getProductById, 
    getProductColor,
    getProductColorById,
    getAllProductImageUrlByColor,
    getProductImagesUrl,
    getDiscountById
  } from '@/api/api_function'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store'

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
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  product: any;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const NumberInputCart: React.FC<Props> = ({ value, onChange, cartItem, 
    setCartItems, product, setPrice }) => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser)
    const currentCart = useSelector((state: RootState) => state.cart)

    const handleUpdateItemInCart = async (newPrice: number) => {
        const cartRes = await updateItemInCart(
            currentCart._id, currentUser, cartItem.productId , cartItem.productColorId, newPrice
            )
          const cart = cartRes.data.data
      
          setCartItems((prevCartItems) => {
            const tempCartItems = prevCartItems.map((item: CartItem) => {
              if (item._id === cartItem._id) {
                return { ...item, productQuantity: value }
              }
              return item
            })
            return tempCartItems
          })

        }

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      onChange(newValue);
      handleUpdateItemInCart(newValue);
    }
  };

  const handleIncrement = () => {
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
      <button className="px-3 pb-1 text-3xl border-gray-300" onClick={handleDecrement}>
        -
      </button>
        <input
            className="w-16 px-2 py-1 border border-secondary-0 text-center"
            value={value}
            onChange={handleInputChange}
        />
      <button className="px-2 pb-1 text-3xl border-gray-300" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default NumberInputCart;