import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useLoaderData, useParams } from 'react-router-dom';
import {
  getProductById,
  getProductColor,
  getProductColorById,
  getAllProductImageUrlByColor,
  getProductImagesUrl,
  getDiscountById,
  getOrderItemByOrder,
  getOrderById,
} from '@/api/api_function';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'react-hook-form';

import BillProductList from './BillProductList';
import BillAddress from './BillAddress';
import { updateOrder } from '@/redux/reducers/order_reducers';

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

interface IOrder {
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

const BillItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  // const orderInfo = useSelector((state: RootState) => state.order.order);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderInfo, setOrderInfo] = useState<IOrder>();
  const [loading, setLoading] = useState(false);
  const [statusClassName, setStatusClassName] = useState('bg-red-500');
  // const [totalSalePrice, setTotalSalePrice] = useState<number>(0);
  // const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    console.log('orderId', id);
    setLoading(true);
    if (id === undefined) return;
    if (currentUser === null) return;
    getOrderById(currentUser, id).then((res) => {
      const orderRes = res.data.data;
      // console.log('orderRes', orderRes);
      setOrderInfo(orderRes);
      dispatch(updateOrder(orderRes));
    });
    getOrderItemByOrder(currentUser, id).then((res) => {
      const orderItemRes = res.data.data;
      setOrderItems(orderItemRes);
      // console.log('orderItemRes', orderItemRes);
      setLoading(false);
    });
  }, []);

  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.productSalePrice
  }, 0)

  const finalPrice = totalPrice + (orderInfo?.orderShippingFee ?? 0);

  useEffect(() => {
    if (orderInfo === null) return;
    switch (orderInfo?.orderStatus) {
      case 'Đặt hàng':
        setStatusClassName('bg-dark-0');
        break;
      case 'Đã xác nhận':
        setStatusClassName('bg-primary-0');
        break;
      case 'Đang vận chuyển':
        setStatusClassName('bg-secondary-0');
        break;
      case 'Đã hoàn tất':
        setStatusClassName('bg-green-500');
        break;
      case 'Bị trả lại':
        setStatusClassName('bg-black');
        break;
      default:
        setStatusClassName('bg-red-500');
    }
  }, [orderInfo]);

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div>
      {loading ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div>
            <h2 className="text-start text-lg rounded-lg py-2">Trạng thái đơn hàng</h2>
            <div className="px-6 pt-4 pb-2">
              <span className={`text-white inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${statusClassName}`}>
                {orderInfo?.orderStatus}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-start text-lg rounded-lg py-2">Sản phẩm</h2>
            {orderItems.map((orderItem) => (
              <BillProductList key={orderItem._id} orderItem={orderItem} orderInfo={orderInfo} />
            ))}
          </div>
          <div>
            <h2 className="text-start text-lg rounded-lg py-2">Địa chỉ giao hàng</h2>
            <BillAddress addressId={orderInfo?.orderAddress} />
          </div>
          <div>
            <h2 className="text-start text-lg rounded-lg py-2">Phương thức thanh toán</h2>
            <div className="">
              <span className="text-gray-700 text-base px-4 py-2 border-2 border-secondary-0 rounded-lg">COD</span>
            </div>
          </div>

          <div>
            <h2 className="text-start text-lg rounded-lg py-2">Thông tin đơn hàng</h2>
            <div className='border-2'>
              <div className="flex justify-between px-4 py-2">
                <div>
                  <h3 className="text-start rounded-lg py-2">Tổng giá trị sản phẩm:</h3>
                  <h3 className="text-start rounded-lg py-2">Phí giao hàng:</h3>
                  <h3 className="text-start rounded-lg py-2">Tổng:</h3>
                </div>
                <div>
                  <h3 className="text-start rounded-lg py-2">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
                  <h3 className="text-start rounded-lg py-2">{orderInfo?.orderShippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
                  <h3 className="text-start rounded-lg py-2">{finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
                </div>
              </div>
            </div>
          </div>
          <button 
          onClick={handleReturn}
          className='w-full uppercase rounded-sm bg-primary-1 text-white p-2 my-2 px-16 hover:bg-black hover:shadow-lg'
          >Quay lại</button>
        </>
      )}
    </div>
  );
};

export default BillItem;