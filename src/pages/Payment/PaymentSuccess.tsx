import {
  createOrder,
  createOrderItem,
  getVNPayReturn,
  removeAllItemFromCart,
} from "@/api/api_function";
import { removeCartItems } from "@/redux/reducers/cartItem_reducers";
import { notify } from "@/redux/reducers/notify_reducers";
import { RootState } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { CartItem } from "../Order/cartOrder";
import { removeConfirmOrder } from "@/redux/reducers/orderConfirm_reducers";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartId = useSelector((state: RootState) => state.cart._id);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { orderInfor } = useSelector((state: RootState) => state.orderConfirm);
  const cartItems = orderInfor.cartItems;
  const tempPrice = orderInfor.totalPrice ? orderInfor.totalPrice : 0;
  const finalPrice = tempPrice + orderInfor.orderShippingFee;
  const selectedAddress = orderInfor.orderAddress;
  const dispatch = useDispatch();
  const VNPayString = "6485bd7318d7886b9017c861";
  const urlParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState<boolean>(false);
  // const urlParams = new URLSearchParams(
  //   "?vnp_Amount=528000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14287723&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+cho+ma+GD%3A+140231&vnp_PayDate=20240119210957&vnp_ResponseCode=00&vnp_TmnCode=FXJUR0TP&vnp_TransactionNo=14287723&vnp_TransactionStatus=00&vnp_TxnRef=140231&vnp_SecureHash=522e622833b3be4fac4044a4efdb3216f19555e694446420151cda9f981161ba9cc654230413c162195a4858cd033d82f3f2649f545ea582a1a56f58c6a6e05b"
  // );
  // vnp_Amount: string,
  // vnp_BankCode: string,
  // vnp_BankTranNo: string,
  // vnp_CardType: string,
  // vnp_OrderInfo: string,
  // vnp_PayDate: string,
  // vnp_ResponseCode: string,
  // vnp_TmnCode: string,
  // vnp_TransactionNo: string,
  // vnp_TransactionStatus: string,
  // vnp_TxnRef: string,
  // vnp_SecureHash: string
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_BankCode = urlParams.get("vnp_BankCode");
  const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
  const vnp_CardType = urlParams.get("vnp_CardType");
  const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
  const vnp_TmnCode = urlParams.get("vnp_TmnCode");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = urlParams.get("vnp_TxnRef");
  const vnp_SecureHash = urlParams.get("vnp_SecureHash");

  const handleOrder = async () => {
    // for
    let orderId = "";
    setLoading(true);
    if (cartItems.length > 0) {
      if (selectedAddress) {
        await createOrder(
          currentUser,
          orderInfor.customerId,
          orderInfor.orderCode.toString(),
          "Đặt hàng",
          orderInfor.orderNote,
          selectedAddress._id.toString(),
          orderInfor.paymentMethod,
          30000
        )
          .then((res) => {
            orderId = res.data.data._id;
            cartItems.forEach((item: CartItem) => {
              const normalPrice = item.productPrice * item.productQuantity;
              const checkPrice = item.productSalePrice
                ? item.productSalePrice
                : item.productPrice;
              const finalPrice = checkPrice * item.productQuantity;

              createOrderItem(
                currentUser,
                orderId,
                item.productId,
                item.productColorId,
                item.productQuantity,
                normalPrice,
                finalPrice
              )
                .then((res) => {
                  console.log("res order item");
                })
                .catch((err) => {
                  dispatch(
                    notify({
                      message: `${err}`,
                      isError: true,
                      isSuccess: false,
                      isInfo: false,
                    })
                  );
                });
            });
          })
          .then(async () => {
            try {
              dispatch(removeConfirmOrder);
              dispatch(
                notify({
                  message: "Đặt hàng thành công",
                  isError: false,
                  isSuccess: true,
                  isInfo: false,
                })
              );
              const result = await removeAllItemFromCart(cartId, currentUser);
              dispatch(removeCartItems());
            } catch (err) {
              dispatch(
                notify({
                  message: `${err}`,
                  isError: true,
                  isSuccess: false,
                  isInfo: false,
                })
              );
            }
          })
          .catch((err) => {
            console.log("err order");
          });
      }
      navigate(`/account/bill/${orderId}`);
    } else {
      // alert("Giỏ hàng trống");
      dispatch(
        notify({
          message: "Giỏ hàng trống",
          isError: true,
          isSuccess: false,
          isInfo: false,
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    const getReturn = async () => {
      if (!currentUser) {
        return;
      } else if (!vnp_Amount) return;
      else if (!vnp_BankCode) return;
      else if (!vnp_BankTranNo) return;
      else if (!vnp_CardType) return;
      else if (!vnp_OrderInfo) return;
      else if (!vnp_PayDate) return;
      else if (!vnp_ResponseCode) return;
      else if (!vnp_TmnCode) return;
      else if (!vnp_TransactionNo) return;
      else if (!vnp_TransactionStatus) return;
      else if (!vnp_TxnRef) return;
      else if (!vnp_SecureHash) return;

      const res = await getVNPayReturn(
        currentUser,
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash
      );
      if (orderInfor.paymentMethod === VNPayString) {
      }
    };
    getReturn();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/signin" replace={true} state={{ from: "/" }} />;
  } else
    return (
      <div>
        <div className="h-full bg-gray-100">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="mx-auto my-6 h-16 w-16 text-green-600"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
                Thanh toán thành công!
              </h3>
              <p className="my-2 text-gray-600">
                Xin chúc mừng bạn đã thanh toán thành công!
              </p>
              <p> Chúc bạn một ngày vui vẻ! </p>
              <div className="py-10 text-center">
                <Link
                  to={"/"}
                  className="min-w-max rounded-sm border border-dark-1 bg-dark-1 px-9 py-2 text-base uppercase 
                text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PaymentSuccess;
