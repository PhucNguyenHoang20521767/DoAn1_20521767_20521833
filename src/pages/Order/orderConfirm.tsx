import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import CartItemComponent from "./cartDetailOrder";
import { useState } from "react";
import { styleButtonOutlined } from "@/utils/ui";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { TruckIcon } from "@heroicons/react/24/outline";
import {
  createOrder,
  createOrderItem,
  createVnpayPayment,
  getAllPayments,
  removeAllItemFromCart,
} from "@/api/api_function";
import { CartItem } from "./cartOrder";
import { notify } from "@/redux/reducers/notify_reducers";
import { useNavigate } from "react-router-dom";
import { removeCartItems } from "@/redux/reducers/cartItem_reducers";

const orderConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderInfor } = useSelector((state: RootState) => state.orderConfirm);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const cartItems = orderInfor.cartItems;
  const tempPrice = orderInfor.totalPrice ? orderInfor.totalPrice : 0;
  const finalPrice = tempPrice + orderInfor.orderShippingFee;
  const selectedAddress = orderInfor.orderAddress;
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "vnpay">("cod");
  const [changeMethod, setChangeMethod] = useState(false);
  const cartId = useSelector((state: RootState) => state.cart._id);

  function handleConfirmOrder(): void {
    if (paymentMethod === "vnpay") {
      setLoading(true);
      createVnpayPayment(currentUser, finalPrice, "", "vn")
        .then((res) => {
          window.location.href = res.data.paymentURL;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleOrder();
    }
  }

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
          "648a91e82b36c6bbd96704a4",
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
              dispatch(
                notify({
                  message: "Đặt hàng thành công",
                  isError: false,
                  isSuccess: true,
                  isInfo: false,
                })
              );
              const result = await removeAllItemFromCart(cartId, currentUser);
              handleRemoveCart();
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

  const handleRemoveCart = () => {
    if (currentUser) {
      dispatch(removeCartItems());
    }
  };

  return (
    <div className="m-8 py-8">
      <h1 className="my-6 flex justify-center text-2xl font-bold text-gray-700 ">
        Đặt hàng
      </h1>
      <hr className="border-1 mb-4 border" />
      <div className="grid grid-cols-2 ">
        <section className="mx-8">
          <h2 className="mb-6 text-xl font-bold text-gray-700 ">
            Danh sách sản phẩm
          </h2>
          {cartItems.map((cartItem: any) => (
            <div key={cartItem.productColorId} className="mb-2">
              <CartItemComponent
                key={cartItem.productColorId}
                cartItem={cartItem}
              />
            </div>
          ))}
          <div className="flex w-full items-center justify-between pt-8">
            {orderInfor.voucher ? (
              <p className="max-w-[16rem] text-xl font-bold text-gray-700">
                Bạn đã được giảm{" "}
                {`${orderInfor.voucher?.voucherValue}` +
                  `${
                    orderInfor.voucher?.voucherType === "PERCENT" ? "%" : "đ"
                  }`}
              </p>
            ) : (
              <p className="text-xl font-bold text-gray-700">
                Không có voucher
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-xl text-gray-700">Giá tạm tính:</span>
            <span className="text-xl text-gray-700">
              <span className="text-xl text-gray-700">
                {orderInfor.totalPrice?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xl text-gray-700">Phí ship:</span>
            <span className="text-xl text-gray-700">
              {orderInfor.orderShippingFee.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <hr className="mb-4 border text-dark-0" />
          <div className="flex justify-between">
            <span className="text-xl text-gray-700">Tổng tiền:</span>
            <span className="text-xl text-gray-700">
              {finalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </section>
        <section className="mx-8">
          <h2 className="mb-2 text-xl font-bold text-gray-700">
            Thông tin địa chỉ
          </h2>
          {selectedAddress && (
            <div className="m-8">
              <div className="flex justify-start space-x-8 text-gray-700">
                <div className="">
                  <div className="flex items-center">
                    <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                      Tên người nhận:
                    </label>
                    <p>
                      {selectedAddress.receiverFirstName}{" "}
                      {selectedAddress.receiverLastName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                      Số điện thoại người nhận:
                    </label>
                    <p>{selectedAddress.receiverPhone}</p>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center">
                    <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                      Tỉnh - Thành phố:
                    </label>
                    <p>
                      {selectedAddress.receiverWard},{" "}
                      {selectedAddress.receiverDistrict},{" "}
                      {selectedAddress.receiverCity}
                    </p>
                  </div>
                  <div className="flex items-center justify-start">
                    <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                      Địa chỉ:
                    </label>
                    <p>{selectedAddress.receiverAddress}</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                  Ghi chú đơn hàng:
                </label>
                <div className="mt-2">
                  <textarea
                    className="form-textarea w-full px-4 py-2"
                    placeholder="Không có ghi chú..."
                    value={orderInfor.orderNote}
                    disabled
                  />
                </div>
              </div>
            </div>
          )}
          <h2 className="my-6 text-xl font-bold text-gray-700 ">
            Phương thức thanh toán
          </h2>
          <div className="flex justify-start space-x-8 px-8 text-gray-700">
            <div className="flex items-center">
              <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                Phương thức:
              </label>
              {paymentMethod === "cod" ? (
                <p>Thanh toán khi nhận hàng</p>
              ) : (
                <p>Thanh toán qua VNPay</p>
              )}
            </div>
            <Button
              variant="text"
              sx={styleButtonOutlined}
              onClick={() => setChangeMethod(true)}
            >
              Thay đổi
            </Button>
          </div>
          {changeMethod && (
            <div className="flex justify-center">
              <ButtonGroup
                variant="outlined"
                aria-label="text button group"
                sx={styleButtonOutlined}
              >
                <Button onClick={() => setPaymentMethod("cod")}>
                  <span className="px-2">
                    <TruckIcon className="h-6 w-6 text-gray-500" />
                  </span>
                  <span className="text-base text-dark-1">COD</span>
                </Button>
                <Button onClick={() => setPaymentMethod("vnpay")}>
                  <span className="px-2">
                    <img src="./VNPAY.webp" alt="vnpay" className="h-6 w-6" />
                  </span>
                  <span className="text-base text-dark-1">VNPay</span>
                </Button>
              </ButtonGroup>
              <Button
                variant="text"
                sx={styleButtonOutlined}
                onClick={() => setChangeMethod(false)}
              >
                Xong
              </Button>
            </div>
          )}
        </section>
      </div>
      <div className="flex items-center justify-center p-8">
        <button
          onClick={handleConfirmOrder}
          className={` min-w-max rounded-sm border border-secondary-1 bg-primary-1 px-9 py-2 text-base 
                  text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                  ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                  ${loading ? "opacity-50" : "opacity-100"}
                  `}
        >
          {loading && <CircularProgress size={20} className="mr-2" />}
          ĐẶT HÀNG
        </button>
      </div>
    </div>
  );
};

export default orderConfirm;
