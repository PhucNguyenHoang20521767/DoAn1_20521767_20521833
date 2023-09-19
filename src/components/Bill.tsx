import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useNavigate } from "react-router-dom";
import { getAllOrder, getOrderItemByOrder } from "@/api/api_function";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { updateOrder } from "@/redux/reducers/order_reducers";
import BillComponent from "./BillComponent";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [orders, setOrders] = useState<IOrderState[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      getAllOrder(currentUser).then((res) => {
        const orderRes = res.data.data;
        const sortedOrders = sortOrders(orderRes, sortOrder);
        setOrders(sortedOrders);
        setLoading(false);
      });
    } else {
      navigate("/signin");
    }
  }, [currentUser, sortOrder]);

  const handleClose = () => {
    setLoading(false);
  };
  const handleOpen = () => {
    setLoading(true);
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as "newest" | "oldest");
  };

  const sortOrders = (orders: IOrderState[], order: "newest" | "oldest") => {
    if (order === "newest") {
      return orders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      return orders.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="mx-2 mb-5 flex justify-end">
        <div className="relative">
          <select
            className="my-2 w-48 rounded-sm border border-gray-300 px-3 py-2"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>
      </div>

      {orders.map((order) => {
        return <BillComponent order={order} key={order._id} />;
      })}
    </>
  );
};

export default Bill;
