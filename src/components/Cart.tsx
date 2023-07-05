import { RootState } from '@/redux/store/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { mainApi } from '@/api/main_api'
import * as apiEndpoints from '@/api/api_endpoints';
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
import ManySkeleton from './loaders/manySkeleton';
import { set } from 'react-hook-form'
import NumberInput from '@/components/customs/NumberInput'
import { CircularProgress } from '@mui/material'

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
}

interface CartItemProps {
  cartItem: CartItem;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartItemComponent = ({ cartItem, setCartItems }: CartItemProps) => {
  const dispatch = useDispatch()
  const currentCart = useSelector((state: RootState) => state.cart)
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const [product, setProduct] = useState<any>(null)
  const [listColor, setListColor] = useState<Color[]>([])
  const [color, setColor] = useState<Color | null>(null);
  const [chooseColor, setChooseColor] = useState<Color | null>(null)
  const [quantity, setQuantity] = useState<number>(cartItem.productQuantity)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [discountNotExpired, setDiscountNotExpired] = useState<boolean>(true)
  const [priceLoading, setPriceLoading] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState<boolean>(true)

  const discountFailed = () => {
    setDiscountNotExpired(false)
    setDiscount(0)
    setPriceLoading(false)
  }

  const handlePrice = async (tempPrice: number) => {
    if (discountNotExpired && product && product.productPrice) {
      const newPrice = (tempPrice * (100 - discount)) / 100
      setPrice(newPrice)
      console.log('newPrice', newPrice)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res3 = await getProductById(cartItem.productId)
        const product = res3.data.data
        setProduct(product)
        setPrice(product.productPrice)
        console.log('1product', product)

        // const imageRes = await getProductImagesUrl(cartItem.productId)
        // const productImages = imageRes.data.data
        // const theImageUrls = productImages.map((productImage: any) => productImage.imageURL);
        // console.log('theImageUrls', theImageUrls)
        // setImageUrls(theImageUrls);

        // const res4 = await getProductColor(cartItem.productId)
        // const productColor = res4.data.data
        // console.log('productColor', productColor)
        // console.log('cartItem', cartItem)

        const colorRes = await getProductColorById(cartItem.productColorId)
        const _color = colorRes.data.color
        setColor(_color)
        // console.log('_color', _color._id)
        // console.log('color', color)

        const res5 = await getAllProductImageUrlByColor(cartItem.productId, cartItem.productColorId)
        const productImageUrls = res5.data.data
        const _imageUrls = productImageUrls.map((productImageUrl: any) => productImageUrl.imageURL);
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
        if(product.productDiscountId) {
          const productDiscountRes = await getDiscountById(product.productDiscountId)
          const productDiscount = productDiscountRes.data.data
          const error = productDiscountRes.data.error
          console.log('error', error)
          // console.log('productDiscount', productDiscount)
          if (productDiscount && new Date(productDiscount.discountEndDate) > new Date()) {
            setDiscount(productDiscount.discountPercent)
            setDiscountNotExpired(true)
            handlePrice(product.productPrice)
          }
          else {
            discountFailed()
          }

          if (error) {
            discountFailed()
          }
        }
        else {
          discountFailed()
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser) {
      fetchProduct()
    }
  }, [currentUser])

  useEffect(() => {
    if (discount) {
      handlePrice(product.productPrice)
    }
    setPriceLoading(false)
  }, [discount])

  if (!product) {
    return <ManySkeleton />
  }

  // const color = listColor.find((c: Color) => c._id === cartItem.productColorId)
  const imageUrl = imageUrls[0]
  const handleColorClick = (color: Color) => {
    setChooseColor(color)
  }

  const handleRemoveItemFromCart = async () => {
    try {
      const res = await removeItemFromCart(
        currentCart._id, currentUser, cartItem.productId , cartItem.productColorId
        )
        setCartItems(prevCartItems => prevCartItems.filter(item => item.productId !== cartItem.productId));
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateItemFromCart = async () => {
    const cartRes = await updateItemInCart(
      currentCart._id, currentUser, cartItem.productId , cartItem.productColorId, quantity
      )
    const cart = cartRes.data.data
  }

  return (
    <>
    <div className='flex justify-between'>
      <div className='flex gap-4 items-center'>
          <img 
          src={imageUrls[0]} 
          alt={product?.productName} 
          className='w-16 h-16 object-contain'
          />
          <Link to={`collection/${cartItem.productId}`}>
            <div className='text-dark-3'>Xem</div>
          </Link>
        <div>
          <div className='font-bold'>{product?.productName}</div>
          <div>
            {listColor.map((color: Color) => (
              <span key={color._id} className={`inline-block w-4 h-4 rounded-full mr-2 ${color.colorHex === chooseColor?.colorHex ? 'border-2 border-black' : ''}`} style={{ backgroundColor: color.colorHex }} onClick={() => handleColorClick(color)}></span>
            ))}
          </div>
          <div className='flex'>
            <div className='font-bold'>
              Số lượng: 
            </div>
            <div className='ml-1'>
              {cartItem.productQuantity}
            </div>
          </div>
          <div>{(price * (cartItem.productQuantity)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
        </div>
      </div>
      <div className='text-red-700 text-xl flex justify-end gap-4'>
        {/* ... */}
        <div className='h-full flex items-center py-4 px-2'>
          <button onClick={handleRemoveItemFromCart}>X</button>
        </div>
      </div>
    </div>
    <div className='flex items-center justify-center my-2'>
      <NumberInput value={quantity} onChange={setQuantity} />
      <div className=''>
          <button 
          onClick={() => handleUpdateItemFromCart()}
          className={`w-full px-3 py-1 text-white bg-primary-1 border rounded-sm border-secondary-1 
          hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
          `}>
              Xác nhận
          </button>
      </div>
    </div>
    </>
  )
}

// Cart

export const Cart = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const currentCart = useSelector((state: RootState) => state.cart)
  const [cart, setCart] = useState<any[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res1 = await getCustomerCart(currentUser)
        const cartInfores = res1.data.data
        setCart(cartInfores)
        // console.log('cart', cart)

        if (cartInfores.length > 0) {
          const res2 = await getAllCartItem(cartInfores[0]._id, currentUser)
          const cartItems = res2.data.data
          setCartItems(cartItems)
          // console.log('cartitem', cartItems)
          console.log('cartItems', cartItems)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const makeCart = async () => {
      try {
        await createCart(currentUser)
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser) {
      fetchCart()
      // if (cart === null) {
      //   makeCart()
      // }
    }
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className='p-5 my-[10rem] text-xl'>Vui lòng đăng nhập để xem giỏ hàng!</div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className='flex justify-center p-5 my-[10rem] text-xl'>Giỏ hàng trống!</div>
    )
  }

  return (
    <>
      {cartItems.map((cartItem: CartItem) => (
        <div className='mb-2'>
          <CartItemComponent key={cartItem.productColorId} cartItem={cartItem} 
          setCartItems={setCartItems}/>
        </div>
      ))}
      <div className='flex justify-center'>
        {
          currentUser &&
          (
            <Link to={'order'}> 
              <button className={
                'uppercase rounded-sm bg-primary-1 text-white p-2 m-2 px-16 hover:bg-black hover:shadow-lg'
              }
              >
                Thanh toán ngay
              </button>
            </Link>
          )
        }
      </div>
    </>
  );
}

export default Cart