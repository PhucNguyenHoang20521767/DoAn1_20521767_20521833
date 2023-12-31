import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllOrder,
  getOrderItemByOrder,
  getAddressById,
  getProductById,
} from "@/api/api_function";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { updateOrder } from "@/redux/reducers/order_reducers";

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
  order: IOrderState;
}

const BillComponent = ({ order }: IOrderStateProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const allProduct = useSelector((state: RootState) => state.all.allProduct);
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [address, setAddress] = useState<any>([]);
  const [product, setProduct] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      getOrderItemByOrder(currentUser, order._id).then((res) => {
        const orderItemRes = res.data.data;
        setOrderItems(orderItemRes);

        getAddressById(order.orderAddress, currentUser).then((res) => {
          const addressRes = res.data.data;
          setAddress(addressRes);
        });

        orderItems.map((item) => {
          getProductById(item.productId).then((res) => {
            const productRes = res.data.data;
            setProduct(productRes);
          });
        });
        setLoading(false);
      });
      dispatch(updateOrder({ order: order }));
    } else {
      navigate("/signin");
    }
  }, [currentUser]);

  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.productSalePrice;
  }, 0);

  const finalPrice = totalPrice + order.orderShippingFee;

  const createdAtDate = new Date(order.createdAt);
  const createdAtDateString = createdAtDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  let statusClassName = "";
  switch (order.orderStatus) {
    case "Đặt hàng":
      statusClassName = "bg-dark-0";
      break;
    case "Đã xác nhận":
      statusClassName = "bg-primary-0";
      break;
    case "Đang vận chuyển":
      statusClassName = "bg-secondary-0";
      break;
    case "Đã hoàn tất":
      statusClassName = "bg-green-500";
      break;
    case "Bị trả lại":
      statusClassName = "bg-black";
      break;
    default:
      statusClassName = "bg-red-500";
  }

  return (
    <div className="m-2 flex max-w-3xl flex-wrap overflow-hidden rounded px-4 shadow-lg">
      <div className="w-2/3">
        <div className="flex items-center">
          <p className="text-lg font-bold text-gray-700">#{order.orderCode}</p>
          <div className="px-6 pb-2 pt-4">
            <span
              className={`mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${statusClassName}`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
        <div className="">
          <div className="my-2">
            <p className="text-base">Ngày đặt hàng: {createdAtDateString}</p>
          </div>
          <div className="my-2">
            <p className="text-base">
              Địa chỉ: {address.receiverDistrict},{address.receiverWard},
              {address.receiverCity},{address.receiverAddress}
            </p>
          </div>
          <div className="my-2">
            <p className="text-base">
              Phí vận chuyển: {order.orderShippingFee}
            </p>
          </div>
          <div className="my-2">
            <p className="text-base">Phương thức thanh toán: COD</p>
          </div>
          <div className="my-2">
            <p className="text-base">Ghi chú: {order.orderNote}</p>
          </div>
        </div>
      </div>
      <div className="flex w-1/3 flex-col">
        <div className="my-8 pt-4">
          {/* <p className='text-lg font-bold text-gray-700 my-2'>Danh sách sản phẩm</p> */}
          <div className="">
            <Link
              to={`${order._id}`}
              className="my-2 text-lg italic text-gray-700"
            >
              Chi tiết đơn hàng
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <div className="mt-10 pb-2">
            <p className="text-base font-semibold">
              Tổng giá trị:{" "}
              {finalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillComponent;
