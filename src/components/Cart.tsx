import { RootState } from '@/redux/store/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCart, getCustomerCart } from '@/api/api_function'

export const Cart = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res1 = await getCustomerCart(currentUser)
        const cartInfores = res1.data.data
        console.log('ci', cartInfores)
        setCart(cartInfores)
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
      if (cart === null) {
        makeCart()
      }
    }
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className='p-5 my-[10rem] text-xl'>Vui lòng đăng nhập để xem giỏ hàng!</div>
    )
  }

  return (
    <>
      
    </>
  )
}

export default Cart