import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useNavigate } from 'react-router-dom'
import { getAllOrder } from '@/api/api_function'

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
                setOrder(res.data)
                setLoading(true)
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