import { mainApi } from "./main_api";
import * as apiEndpoints from "./api_endpoints";
import { baseURL } from "./main_api";
import { useDispatch, useSelector } from "react-redux";
import { loadcart } from "@/redux/reducers/cart_reducers";
import { RootState } from "@/redux/store/store";
import axios from "axios";
import { url } from "inspector";
import useToken from "antd/es/theme/useToken";
import { UploadFile } from "antd";
import { getBase64 } from "@/utils/function";
import { get } from "http";

//google login callback
// export const googleLoginCallback = async () => {
//     window.open(
//         `${baseURL}/auth/google/callback`,
//         "_self"
//       )
// }

// //google login success
// export const googleLoginSuccess = async () => {
//     return await mainApi.get(
//         apiEndpoints.GOOGLE_LOGIN_SUCCESS,
//         { withCredentials: true }
//         );
// }

// //google logout
// export const googleLogout = async () => {
//     window.open(
//         `${baseURL}/auth/google/logout`,
//         "_self"
//         )
// }

//change passwords
export const changePassword = async (
  idToken: string,
  oldPassword: string,
  newPassword: string
) => {
  return await mainApi.post(
    apiEndpoints.CHANGE_PASSWORD,
    apiEndpoints.getChangePasswordBody(idToken, oldPassword, newPassword)
  );
};

//get user info
interface UserInfo {
  customerFirstName: string;
  customerLastName: string;
  customerBirthday: Date;
  customerGender: string;
  customerEmail: string;
  customerAvatar: string;
}
export const getUserInfo = async (id: string): Promise<UserInfo> => {
  return await mainApi.get(apiEndpoints.GET_USER_INFO(id));
};

//get customer by id
export const getCustomerById = async (id: string, token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_USER_INFO(id),
    apiEndpoints.getAccessToken(token)
  );
};

//update customer
export const updateCustomer = async (
  id: string,
  token: string,
  customerFirstName: string,
  customerLastName: string,
  customerBirthday: string,
  customerEmail: string,
  customerGender: string
) => {
  return await axios({
    method: "put",
    url: `${baseURL}/customers/updateCustomer/${id.toString()}`,
    data: {
      customerFirstName: customerFirstName,
      customerLastName: customerLastName,
      customerBirthday: customerBirthday,
      customerEmail: customerEmail,
      customerGender: customerGender,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

//get avatar url
export const getAvatar = async (token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_AVATAR_URL,
    apiEndpoints.getAccessToken(token)
  );
};

//get avatar url by id
export const getAvatarById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_AVATAR_URL_BY_ID(id));
};

//save avatar
export const saveAvatar = async (token: string, avatar: File) => {
  const formData = new FormData();
  formData.append("Files[]", avatar);

  return await mainApi.post(
    apiEndpoints.SAVE_AVATAR,
    formData,
    apiEndpoints.getAccessToken(token)
  );
};

//create address
export const createAddress = async (
  id: string,
  token: string,
  firstname: string,
  lastname: string,
  phone: string,
  address: string,
  ward: string,
  district: string,
  city: string,
  isDefault: boolean
) => {
  return await mainApi.post(
    apiEndpoints.CREATE_ADDRESS(id),
    apiEndpoints.getCreateAddressBody(
      firstname,
      lastname,
      phone,
      address,
      ward,
      district,
      city,
      isDefault
    ),
    apiEndpoints.getAccessToken(token)
  );
};

//delete address
export const deleteAddress = async (id: string, token: string) => {
  return await mainApi.delete(
    apiEndpoints.DELETE_ADDRESS(id),
    apiEndpoints.getAccessToken(token)
  );
};

//get all addresses
export const getAllAddresses = async (id: string, token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ALL_ADDRESS(id),
    apiEndpoints.getAccessToken(token)
  );
};

//get address by id
export const getAddressById = async (id: string, token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ADDRESS_BY_ID(id),
    apiEndpoints.getAccessToken(token)
  );
};

//set default address
export const setDefaultAddress = async (id: string, token: string) => {
  return await axios({
    method: "put",
    url: `${baseURL}/addresses/setDefaultAddress/${id.toString()}`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  // return await mainApi.put(
  //     apiEndpoints.SET_DEFAULT_ADDRESS(id),
  //     apiEndpoints.getAccessToken(token)
  // );
};

export const updateAddress = async (
  id: string,
  token: string,
  firstname: string,
  lastname: string,
  phone: string,
  address: string,
  ward: string,
  district: string,
  city: string,
  isDefault: boolean
) => {
  return await axios({
    method: "put",
    url: `${baseURL}/addresses/updateAddress/${id.toString()}`,
    data: {
      receiverFirstName: firstname,
      receiverLastName: lastname,
      receiverPhone: phone,
      receiverAddress: address,
      receiverWard: ward,
      receiverDistrict: district,
      receiverCity: city,
      isDefault: isDefault,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  // return await mainApi.put(
  //     apiEndpoints.UPDATE_ADDRESS(id),
  //     apiEndpoints.getCreateAddressBody(firstname, lastname, phone, address, ward, district, city, isDefault),
  //     apiEndpoints.getAccessToken(token)
  // );
};

//get all products
export const getAllProducts = async () => {
  return await mainApi.get(apiEndpoints.GET_ALL_PRODUCTS);
};

export const getProductById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_PRODUCT_BY_ID(id));
};

//get categories by id
export const getCategoriesById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_CATEGORIES_BY_ID(id));
};

//get all subcategories
export const getAllSubcategories = async () => {
  return await mainApi.get(apiEndpoints.GET_SUBCATEGORIES);
};

//get subcategories by id
export const getSubcategoriesById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_SUBCATEGORIES_BY_ID(id));
};

//get all color
export const getAllColors = async () => {
  return await mainApi.get(apiEndpoints.GET_ALL_COLORS);
};

//get all products color
export const getProductColor = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_ALL_PRODUCT_COLORS(id));
};

//get all product images
export const getProductImages = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_ALL_PRODUCT_IMAGES(id));
};
//get all product images url
export const getProductImagesUrl = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_PRODUCT_IMAGES_URL(id));
};

export const getProductImageByColor = async (pid: string, cid: string) => {
  return await mainApi.get(apiEndpoints.GET_PRODUCT_IMAGES_BY_COLOR(pid, cid));
};

export const getAllProductImageUrlByColor = async (
  pid: string,
  cid: string
) => {
  return await mainApi.get(
    apiEndpoints.GET_PRODUCT_IMAGES_URL_BY_COLOR(pid, cid)
  );
};

//get product color by id
export const getProductColorById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_PRODUCT_COLOR_BY_ID(id));
};

//get product dimension by id
export const getProductDimensionById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_PRODUCT_DIMENSION_BY_ID(id));
};

//get product rating
export const getProductRating = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_PRODUCT_RATING_BY_ID(id));
};

//get discount by id
export const getDiscountById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_DISCOUNT_BY_ID(id));
};

// get all valid discounts
export const getAllValidDiscounts = async () => {
  return await mainApi.get(apiEndpoints.GET_ALL_VALID_DISCOUNTS);
};

//create cart
export const createCart = async (token: string) => {
  return await mainApi.post(
    apiEndpoints.CREATE_CART,
    apiEndpoints.getAccessToken(token)
  );
};
//get customer cart
export const getCustomerCart = async (token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_CUSTOMER_CART,
    apiEndpoints.getAccessToken(token)
  );
};
//get all cart item
export const getAllCartItem = async (id: string, token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ALL_CART_ITEMS(id),
    apiEndpoints.getAccessToken(token)
  );
};
//add item to cart
export const addItemToCart = async (
  id: string,
  token: string,
  productId: string,
  colorId: string,
  quantity: number
) => {
  return await mainApi.post(
    apiEndpoints.ADD_ITEM_TO_CART(id),
    apiEndpoints.getAddItemToCartBody(productId, colorId, quantity),
    apiEndpoints.getAccessToken(token)
  );
};

export const fetchCart = async () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch();
  try {
    const res1 = await getCustomerCart(currentUser);
    const cartInfores = res1.data.data;
    dispatch(loadcart(cartInfores));

    if (cartInfores.length > 0) {
      const res2 = await getAllCartItem(cartInfores[0]._id, currentUser);
      const cartItems = res2.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//update item in cart
export const updateItemInCart = async (
  id: string,
  token: string,
  productId: string,
  colorId: string,
  quantity: number
) => {
  return await mainApi.put(
    apiEndpoints.UPDATE_ITEM_IN_CART(id),
    apiEndpoints.getAddItemToCartBody(productId, colorId, quantity),
    apiEndpoints.getAccessToken(token)
  );
};
//remove item from cart
export const removeItemFromCart = async (
  id: string,
  token: string,
  pid: string,
  cid: string
) => {
  return await mainApi.put(
    apiEndpoints.REMOVE_ITEM_FROM_CART(id),
    apiEndpoints.getRemoveItemFromCartBody(pid, cid),
    apiEndpoints.getAccessToken(token)
  );
};
//remove all items from cart
export const removeAllItemFromCart = async (id: string, token: string) => {
  return await mainApi.delete(
    apiEndpoints.REMOVE_ALL_ITEMS_FROM_CART(id),
    apiEndpoints.getAccessToken(token)
  );
};

//create order
export const createOrder = async (
  token: string,
  customerId: string,
  orderCode: string,
  orderStatus: string,
  orderNote: string,
  orderAddress: string,
  paymentMethod: string,
  orderShippingFee: number
) => {
  return await mainApi.post(
    apiEndpoints.CREATE_ORDER,
    apiEndpoints.getCreateOrderBody(
      customerId,
      orderCode,
      orderStatus,
      orderNote,
      orderAddress,
      paymentMethod,
      orderShippingFee
    ),
    apiEndpoints.getAccessToken(token)
  );
};

//create order item
export const createOrderItem = async (
  token: string,
  orderId: string,
  productId: string,
  productColorId: string,
  productQuantity: number,
  productPrice: number,
  productSalePrice: number
) => {
  return await mainApi.post(
    apiEndpoints.CREATE_ORDER_ITEM,
    apiEndpoints.getCreateOrderItemBody(
      orderId,
      productId,
      productColorId,
      productQuantity,
      productPrice,
      productSalePrice
    ),
    apiEndpoints.getAccessToken(token)
  );
};

//get all order
export const getAllOrder = async (token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ALL_ORDERS_FOR_CUSTOMER,
    apiEndpoints.getAccessToken(token)
  );
};

//get order by id
export const getOrderById = async (token: string, id: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ORDER_BY_ID(id),
    apiEndpoints.getAccessToken(token)
  );
};

//get order item by order
export const getOrderItemByOrder = async (token: string, id: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ORDER_ITEMS_FOR_ORDER(id),
    apiEndpoints.getAccessToken(token)
  );
};

//get customer wishlist
export const getCustomerWishlist = async (token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_CUSTOMER_WISHLIST,
    apiEndpoints.getAccessToken(token)
  );
};

//add or remove product from wishlist
export const addOrRemoveProductFromWishlist = async (
  token: string,
  productId: string
) => {
  // return await mainApi.put(
  //     apiEndpoints.ADD_OR_REMOVE_PRODUCT_FROM_WISHLIST(productId),
  //     apiEndpoints.getAccessToken(token)
  //     );
  return await axios({
    method: "put",
    url: `${baseURL}/wishlist/addOrRemoveProductFromWishlist/${productId}`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

//get all prouct feedback
export const getAllProductFeedback = async (productId: string) => {
  return await mainApi.get(apiEndpoints.GET_ALL_PRODUCT_FEEDBACKS(productId));
};

//create feedback
export const createFeedback = async (
  token: string,
  customerId: string,
  productId: string,
  productColorId: string,
  orderId: string,
  feedbackRating: number,
  feedbackTitle: string,
  feedbackContent: string
) => {
  return await mainApi.post(
    apiEndpoints.CREATE_FEEDBACK,
    apiEndpoints.getCreateFeedbackBody(
      customerId,
      productId,
      productColorId,
      orderId,
      feedbackRating,
      feedbackTitle,
      feedbackContent
    ),
    apiEndpoints.getAccessToken(token)
  );
};

//get all feedback images
export const getAllFeedbackImages = async (feedbackId: string) => {
  return await mainApi.get(apiEndpoints.GET_ALL_FEEDBACK_IMAGES(feedbackId));
};

//save feedback image
export const saveFeedbackImage = async (
  token: string,
  feedbackId: string,
  images: UploadFile[]
) => {
  const formData = new FormData();
  for (const image of images) {
    if (!image.originFileObj) continue;
    formData.append("Files[]", image.originFileObj);
  }

  return await mainApi.post(
    apiEndpoints.SAVE_FEEDBACK_IMAGES(feedbackId),
    formData,
    apiEndpoints.getAccessToken(token)
  );
};

//delete feedback image
export const deleteFeedbackImage = async (
  token: string,
  feedbackId: string
) => {
  return await mainApi.delete(
    apiEndpoints.DELETE_FEEDBACK_IMAGES(feedbackId),
    apiEndpoints.getAccessToken(token)
  );
};

//preview attachment
export const previewAttachment = async (attachmentId: string) => {
  return await mainApi.get(apiEndpoints.PREVIEW_ATTACHMENT(attachmentId));
};

export const loginWithGoogle = async (
  password: string,
  firstname: string,
  lastname: string,
  birthday: Date,
  email: string,
  gender: string,
  provider: string
) => {
  return await mainApi.post(
    apiEndpoints.LOGIN_GOOGLE,
    apiEndpoints.getLoginGoogleBody(
      password,
      firstname,
      lastname,
      birthday,
      email,
      gender,
      provider
    )
  );
};

export const googleLoginCallback = () => {
  window.open(`${baseURL}/auth/google/callback`, "_self");
};

export const googleLoginSuccess = async () => {
  return await mainApi.get(apiEndpoints.GOOGLE_LOGIN_SUCCESS, {
    withCredentials: true,
  });
};

export const googleLogout = () => {
  window.open(`${baseURL}/auth/google/logout`, "_self");
};

export const getAllBlogPosts = async (
  search: string,
  page: number,
  limit: number
) => {
  // return await mainApi.get(
  //   apiEndpoints.GET_ALL_BLOG_POSTS(search, page, limit)
  // );
  if (search == "") {
    return await axios({
      method: "get",
      url: `${baseURL}/posts/getAllBlogPosts?page=${page}&limit=${limit}`,
    });
  } else {
    return await axios({
      method: "get",
      url: `${baseURL}/posts/getAllBlogPosts?search=${search}&page=${page}&limit=${limit}`,
    });
  }
};

export const getBlogPostById = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_BLOG_POST_BY_ID(id));
};

// get lastest blog post
export const getLatestBlogPost = async () => {
  return await mainApi.get(apiEndpoints.GET_LATEST_BLOG_POSTS);
};

// conversation
// export const createConversation = async (token: string) => {
//   return await mainApi.post(
//     apiEndpoints.CREATE_CONVERSATION,
//     apiEndpoints.getAccessToken(token)
//   );
// };

export const createConversation = async (token: string) => {
  return await axios({
    method: "post",
    url: `${baseURL}/conversations/createConversationForCustomer`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

//get user conversation
export const getUserConversation = async (token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_USER_CONVERSATION,
    apiEndpoints.getAccessToken(token)
  );
};

//get all messages for conversation
export const getAllMessagesForConversation = async (id: string) => {
  return await mainApi.get(apiEndpoints.GET_ALL_MESSAGES_FOR_CONVERSATION(id));
};

//create message
export const createMessage = async (
  senderId: string,
  conversationId: string,
  messageText: string
) => {
  return await mainApi.post(
    apiEndpoints.CREATE_MESSAGE,
    apiEndpoints.getCreateMessageBody(senderId, conversationId, messageText)
  );
};

//get all valid vouchers
export const getAllValidVouchers = async (token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ALL_VALID_VOUCHERS,
    apiEndpoints.getAccessToken(token)
  );
};

//create vnpay payment
export const createVnpayPayment = async (
  token: string,
  amount: number,
  bankCode: string,
  language: string
) => {
  return await mainApi.post(
    apiEndpoints.CREATE_VNPAY_PAYMENT,
    apiEndpoints.getCreateVNPayPaymentBody(amount, bankCode, language),
    apiEndpoints.getAccessToken(token)
  );
};

//get all payments
export const getAllPayments = async (token: string) => {
  return await mainApi.get(
    apiEndpoints.GET_ALL_PAYMENTS,
    apiEndpoints.getAccessToken(token)
  );
};

// https://nguyenshomefurniture-be.onrender.com/api/payments/getVNPayReturn?
// vnp_Amount=528000000&
// vnp_BankCode=NCB&
// vnp_BankTranNo=VNP14287723&
// vnp_CardType=ATM&
// vnp_OrderInfo=Thanh+toan+cho+ma+GD%3A+140231&
// vnp_PayDate=20240119210957&
// vnp_ResponseCode=00&
// vnp_TmnCode=FXJUR0TP&
// vnp_TransactionNo=14287723&
// vnp_TransactionStatus=00&
// vnp_TxnRef=140231&
// vnp_SecureHash=522e622833b3be4fac4044a4efdb3216f19555e694446420151cda9f981161ba9cc654230413c162195a4858cd033d82f3f2649f545ea582a1a56f58c6a6e05b
//get vnpay return
export const getVNPayReturn = async (
  token: string,
  vnp_Amount: string,
  vnp_BankCode: string,
  vnp_BankTranNo: string,
  vnp_CardType: string,
  vnp_OrderInfo: string,
  vnp_PayDate: string,
  vnp_ResponseCode: string,
  vnp_TmnCode: string,
  vnp_TransactionNo: string,
  vnp_TransactionStatus: string,
  vnp_TxnRef: string,
  vnp_SecureHash: string
) => {
  return await axios({
    method: "get",
    url: `${baseURL}/payments/getVNPayReturn?vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_BankTranNo=${vnp_BankTranNo}&vnp_CardType=${vnp_CardType}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_PayDate=${vnp_PayDate}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TmnCode=${vnp_TmnCode}&vnp_TransactionNo=${vnp_TransactionNo}&vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_TxnRef=${vnp_TxnRef}&vnp_SecureHash=${vnp_SecureHash}`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
