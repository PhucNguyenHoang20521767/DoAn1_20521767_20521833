import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useNavigate } from 'react-router-dom'
import { getAllOrder, getOrderItemByOrder } from '@/api/api_function'

import { updateOrder } from '@/redux/reducers/order_reducers'

interface Order {
    orderShippingFee: number;
    _id: string;
    customerId: string;
    orderCode: string;
    orderStatus: string;
    orderNote: string;
    orderAddress: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
  }

const Bill = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state: RootState) => state.auth.currentUser)
    const [order, setOrder] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentUser) {
            getAllOrder(currentUser).then((res) => {
                const orderRes = res.data.data
                setOrder(orderRes)
                setLoading(true)
                dispatch(updateOrder(orderRes))

                getOrderItemByOrder(currentUser, orderRes[0]._id).then((res) => {
                    const orderItemRes = res.data.data
                    dispatch(updateOrder(orderItemRes))
                })
            })
        }
        else {
            navigate('signin')
        }
    }, [currentUser])

    return (
        <>

        </>
    )
}

export default Bill