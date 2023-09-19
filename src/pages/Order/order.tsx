import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "@/components/Cart";
import BreadcrumbsOrder from "@/components/BreadcrumbsOrder";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import { set } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getAllAddresses,
  createOrder,
  createOrderItem,
  removeAllItemFromCart,
} from "@/api/api_function";
import { CircularProgress } from "@mui/material";
import { getRandomNumber } from "@/utils/function";
import { removeCartItems } from "@/redux/reducers/cartItem_reducers";
import { notify } from "@/redux/reducers/notify_reducers";

interface CartItem {
  _id: string;
  productId: string;
  productColorId: string;
  productQuantity: number;
  cartId: number;
  productPrice: number;
  productDiscount: number;
  productSalePrice: number;
}

interface IAddress {
  _id: string;
  customerId: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverWard: string;
  receiverDistrict: string;
  receiverCity: string;
  isDefault: boolean;
}

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userId = useSelector((state: RootState) => state.auth.id);
  const cartId = useSelector((state: RootState) => state.cart._id);
  const [price, setPrice] = useState(0);
  const ship = 30000;
  const [totalPrice, setTotalPrice] = useState(price + ship);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [chooseAddress, setChooseAddress] = useState<IAddress>({} as IAddress);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [reload, setReload] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  const handleDefaultAddress = () => {
    const defaultAddress = addresses.find(
      (address) => address.isDefault === true
    );
    setSelectedAddress(defaultAddress || null);
  };

  const handleReload = () => {
    setReload(!reload);
    setOrderNote("");
    handleDefaultAddress();
  };

  const handleRemoveCart = () => {
    if (currentUser) {
      dispatch(removeCartItems());
    }
  };

  const handelLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (currentUser) {
      getAllAddresses(userId, currentUser)
        .then((res) => {
          const addr = res.data.data;
          // console.log("adr", addr)
          setAddresses(addr);
          // console.log("address", addresses)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser, reload]);

  useEffect(() => {
    if (addresses) {
      // const defaultAddress = addresses.find((address) => address.isDefault === true)
      // setSelectedAddress(defaultAddress || null)
      handleDefaultAddress();
    }
  }, [addresses]);

  useEffect(() => {
    if (cartItems) {
      // let tempPrice = 0;

      // cartItems.forEach((item: CartItem) => {
      //   if (item.productSalePrice !== undefined) {
      //     const newPrice = price + (item.productSalePrice * item.productQuantity)
      //     tempPrice += newPrice
      //     console.log('newPrice', newPrice)
      //   }
      // })

      // dkm javascript, state nó cập nhật chậm quá phải đợi render lại component mới có, nên thôi dùng cái này

      const resultPrice = cartItems.reduce((total: number, item: CartItem) => {
        if (item.productSalePrice) {
          return total + item.productSalePrice * item.productQuantity;
        }
        return total + item.productPrice * item.productQuantity;
      }, 0);

      console.log("cartItems", cartItems);
      console.log("resultPrice", resultPrice);

      setPrice(resultPrice);
    }
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(price + ship);
  }, [price]);

  const handleSelectAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    const address = addresses.find(
      (address) => address._id === selectedAddressId
    );
    setSelectedAddress(address || null);
  };

  const handleOrderNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOrderNote(event.target.value);
  };

  const handleOrder = async () => {
    let orderId = "";
    setLoading(true);
    if (cartItems.length > 0) {
      const randomNumber = getRandomNumber(100000, 999999);
      if (selectedAddress) {
        await createOrder(
          currentUser,
          userId,
          randomNumber.toString(),
          "Đặt hàng",
          orderNote,
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

              console.log("user", currentUser);

              console.log(
                "orderItem",
                orderId,
                item.productId,
                item.productColorId,
                item.productQuantity,
                normalPrice,
                finalPrice
              );

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
                  console.log(res);
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
              console.log("rs", result);
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
            console.log(err);
          });
      }
      handleReload();
      navigate(`/account/bill/${orderId}`);
    } else {
      alert("Giỏ hàng trống");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3">
          <div className="mt-2">
            <BreadcrumbsOrder />
          </div>
          <h1 className="my-6 flex justify-center text-2xl font-bold text-gray-700">
            Danh sách sản phẩm
          </h1>
          <div className="m-8">
            <Cart isCart={false} />
          </div>
          <div className="m-8">
            {/* total price */}
            <div className="flex justify-between">
              <span className="text-xl text-gray-700">Giá tạm tính:</span>
              <span className="text-xl text-gray-700">
                {price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl text-gray-700">Phí ship:</span>
              <span className="text-xl text-gray-700">
                {ship.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <hr className="mb-4 border text-dark-0" />
            <div className="flex justify-between">
              <span className="text-xl text-gray-700">Tổng tiền:</span>
              <span className="text-xl text-gray-700">
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full bg-light-4 text-xl md:w-2/3">
          {/* <h1 className='text-2xl font-bold text-gray-700 my-6 flex justify-center'>Chọn địa chỉ giao hàng</h1> */}
          <div className="m-8">
            <h1 className="my-6 flex justify-center text-2xl font-bold text-gray-700">
              Chọn địa chỉ
            </h1>
            <div className="m-8">
              <select className="form-select" onChange={handleSelectAddress}>
                {/* <option value=''>Chọn địa chỉ</option> */}
                {addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.receiverAddress}, {address.receiverDistrict},{" "}
                    {address.receiverWard}, {address.receiverCity}
                  </option>
                ))}
              </select>
            </div>
            {selectedAddress && (
              <div className="m-8">
                <h2 className="mb-2 text-xl font-bold text-gray-700">
                  Thông tin địa chỉ
                </h2>
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
                      className="form-textarea w-full"
                      placeholder="Nhập ghi chú đơn hàng của bạn ở đây..."
                      value={orderNote}
                      onChange={handleOrderNoteChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="m-8 mx-16">
            <div className="mt-3 p-1">
              {cartItems.length > 0 ? (
                <button
                  onClick={handleOrder}
                  className={`w-full rounded-sm border border-secondary-1 bg-primary-1 px-3 py-1 text-white 
                hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                ${loading ? "opacity-50" : "opacity-100"}
                `}
                >
                  {loading && <CircularProgress size={20} className="mr-2" />}
                  ĐẶT HÀNG
                </button>
              ) : (
                <div className="flex items-center justify-center space-x-4">
                  <p>Hãy đưa sản phẩm vào giỏ hàng để thanh toán</p>
                  <button
                    onClick={() => navigate("/product")}
                    className={`w-full max-w-lg rounded-sm border border-secondary-1 bg-primary-1 px-3 py-1 text-white 
                hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50`}
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
