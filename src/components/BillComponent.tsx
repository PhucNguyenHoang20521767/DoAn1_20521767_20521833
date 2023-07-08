import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useNavigate } from 'react-router-dom'
import { getAllOrder, getOrderItemByOrder, getAddressById, getProductById } from '@/api/api_function'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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

interface IOrderStateProps {
  order: IOrderState
}

const BillComponent = ({order}: IOrderStateProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const allProduct = useSelector((state: RootState) => state.all.allProduct)
  const [loading, setLoading] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [address, setAddress] = useState<any>([])
  const [product, setProduct] = useState<any[]>([])

  useEffect(() => {
    if (currentUser) {
      setLoading(true)
      getOrderItemByOrder(currentUser, order._id).then((res) => {
        const orderItemRes = res.data.data
        setOrderItems(orderItemRes)
        console.log('orderItemRes', orderItemRes)
        setLoading(false)

        getAddressById(order.orderAddress, currentUser).then((res) => {
            const addressRes = res.data.data
            setAddress(addressRes)
        })

        orderItems.map((item) => {
            getProductById(item.productId).then((res) => {
                const productRes = res.data.data
                setProduct(productRes)
            })
        })
      })
    }
    else {
      navigate('signin')
    }
  }, [currentUser])

  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.productSalePrice
  }, 0)

  const finalPrice = totalPrice + order.orderShippingFee

  const createdAtDate = new Date(order.createdAt)
  const createdAtDateString = createdAtDate.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  let statusClassName = ''
  switch (order.orderStatus) {
    case 'Đặt hàng':
      statusClassName = 'bg-dark-0'
      break
    case 'Đã xác nhận':
      statusClassName = 'bg-primary-0'
      break
    case 'Đang vận chuyển':
      statusClassName = 'bg-secondary-0'
      break
    case 'Đã hoàn tất':
      statusClassName = 'bg-green-500'
      break
    case 'Bị trả lại':
      statusClassName = 'bg-black'
      break
    default:
      statusClassName = 'bg-red-500'
  }

  return (
    <div className='max-w-3xl rounded overflow-hidden shadow-lg m-2 px-4 flex flex-wrap'>
        <div className='w-2/3'>
            <div className='flex items-center'>
                <p className='text-lg font-bold text-gray-700'>
                    #{order.orderCode}
                </p>
                <div className="px-6 pt-4 pb-2">
                    <span className={`text-white inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${statusClassName}`}>
                        {order.orderStatus}
                    </span>
                </div>
            </div>
            <div className=''>
                <div className='my-2'>
                    <p className='text-base'>Ngày đặt hàng: {createdAtDateString}</p>
                </div>
                <div className='my-2'>
                    <p className='text-base'>Địa chỉ: {address.receiverDistrict}, 
                    {address.receiverWard},
                    {address.receiverCity},
                    {address.receiverAddress}
                     </p>
                </div>
                <div className='my-2'>
                    <p className='text-base'>Phí vận chuyển: {order.orderShippingFee}</p>
                </div>
                <div className='my-2'>
                    <p className='text-base'>Phương thức thanh toán: COD</p>
                </div>
                <div className='my-2'>
                    <p className='text-base'>Ghi chú: {order.orderNote}</p>
                </div>
                <div className='my-2 flex justify-end'>
                    <p className='text-base'>Tổng giá trị: {(finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</p>
                </div>
            </div>
        </div>
        <div className='w-1/3'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col items-center'>
                    {/* <p className='text-lg font-bold text-gray-700 my-2'>Danh sách sản phẩm</p> */}
                    <div className='flex flex-col items-center'>
                        {orderItems.map((orderItem) => {
                            return (
                                <div key={orderItem.productColorId} className='flex flex-row items-center'>
                                    {/* <p className='text-base'>{orderItem.productQuantity} x </p> */}
                                    {

                                    }
                                </div>
                            )}
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BillComponent