import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useNavigate } from 'react-router-dom'
import { getAllOrder, getOrderItemByOrder } from '@/api/api_function'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { updateOrder } from '@/redux/reducers/order_reducers'
import BillComponent from './BillComponent'

interface IOrderState {
  _id: string;
  customerId: string;
  staffId: string | null;
  orderCode: string;
  orderStatus: string;
  orderNote: string;
  orderAddress: string;
  paymentMethod: string;
  orderShippingFee: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  _id: string;
  orderId: string;
  productId: string;
  productColorId: string;
  productQuantity: number;
  productPrice: number;
  productSalePrice: number;
  createdAt: string;
  updatedAt: string;
}

const Bill = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const [order, setOrder] = useState<IOrderState[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
        setLoading(true)
        getAllOrder(currentUser).then((res) => {
            const orderRes = res.data.data
            setOrder(orderRes)
            setLoading(false)
        })
    }
    else {
      navigate('signin')
    }
  }, [currentUser])

  const handleClose = () => {
    setLoading(false);
  };
  const handleOpen = () => {
    setLoading(true);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <div className="pl-[5rem] border-l-2 my-10 flex justify-start"> 
        <div className="w-[48rem] max-[512px]:w-full">
        <h1 className='flex justify-center text-2xl font-bold text-gray-700'>Hoá đơn mua hàng</h1>
      {
        order.map((item) => {
            return (
                <BillComponent
                order={item}
                key={item._id}
                />
            )
        })
      }
        </div>
    </div>
    </>
  )
}

export default Bill