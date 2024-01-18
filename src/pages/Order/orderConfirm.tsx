import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import CartItemComponent from "./cartDetailOrder";

const orderConfirm = () => {
  const { orderInfor } = useSelector((state: RootState) => state.orderConfirm);
  const cartItems = orderInfor.cartItems;
  const tempPrice = orderInfor.totalPrice ? orderInfor.totalPrice : 0;
  const finalPrice = tempPrice + orderInfor.orderShippingFee;
  const selectedAddress = orderInfor.orderAddress;

  return (
    <div className="m-8 py-8">
      <h1 className="my-6 flex justify-center text-2xl font-bold text-gray-700 ">
        Đặt hàng
      </h1>
      <div className="grid grid-cols-2 ">
        <section className="mx-8">
          <h2 className="my-6 text-xl font-bold text-gray-700 ">
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
        </section>
      </div>
    </div>
  );
};

export default orderConfirm;
