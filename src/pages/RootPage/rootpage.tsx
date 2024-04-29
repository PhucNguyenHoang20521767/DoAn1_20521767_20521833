import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Stack, Snackbar } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomeDrawer from "../Drawer/drawer";
import LoadAllProduct from "@/components/LoadAllProduct";
import {
  createCart,
  getCustomerCart,
  getAllCartItem,
  googleLoginSuccess,
  loginWithGoogle,
} from "@/api/api_function";
import { gglogin } from "@/redux/reducers/auth_reducers";
import { loadcart } from "@/redux/reducers/cart_reducers";
import { loadCartItems } from "@/redux/reducers/cartItem_reducers";
import SuccessNotify from "@/components/customs/SuccessNotify";
import InformationNotify from "@/components/customs/InformationNotify";
import ErrorNotify from "@/components/customs/ErrorNotify";
import { fetchConversation } from "./Loading";
import {
  IConversationState,
  loadConversation,
} from "@/redux/reducers/conversation_reducers";
import LoadingPage from "@/utils/loadingPage";
// import "./snow.css";
// import Snowflake from "./SnowFlake";

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

interface ICartState {
  cartItems: CartItem[];
}

const GOOGLE_LOGIN_MAGIC_NUMBER = "12345678";

const RootPage = () => {
  const dispatch = useDispatch();
  const loginType = useSelector((state: RootState) => state.auth.loginType);
  const isLog = useSelector((state: RootState) => state.auth.isLogin);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const currentCart = useSelector((state: RootState) => state.cart);
  const [openSnack, setOpenSnack] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Login
  useEffect(() => {
    if (!isLog && loginType === "google" && currentUser === "") {
      handleLoginWithGoogle();
    }
  }, [isLog, loginType, currentUser]);

  const handleLoginWithGoogle = async () => {
    try {
      const result = await googleLoginSuccess();

      const ggUser = result.data.user._json;

      const googleLogin = await loginWithGoogle(
        "12345678",
        ggUser.given_name,
        ggUser.family_name,
        new Date(),
        ggUser.email,
        "Nam",
        "Google"
      );
      const ava = ggUser.picture;

      const userLogin = {
        currentUser: googleLogin.data.token,
        id: googleLogin.data.data._id,
        customerIdToken: googleLogin.data.customerIdToken,
        isLogin: true,
        loginType: "google",
        avatar: ava,
      };

      dispatch(gglogin(userLogin));
    } catch (error: any) {
      console.log("error all");
    }
  };

  const makeCart = async () => {
    try {
      if (currentUser) await createCart(currentUser);
    } catch (error) {
      console.log("error createCart");
    }
  };

  const fetchCartItem = async () => {
    try {
      const res = await getAllCartItem(currentCart._id, currentUser);
      const cartItems = res.data.data;
      if (cartItems.length === 0)
        dispatch(
          loadCartItems({
            cartItems: [],
            isDeleted: true,
          })
        );
    } catch (error) {
      console.log("error fetchCartItem");
    }
  };

  const fetchCart = async () => {
    try {
      const res1 = await getCustomerCart(currentUser);
      const cartInfores = res1.data.data;
      const cartInfo = {
        _id: cartInfores[0]._id,
        customerId: cartInfores[0].customerId,
        cartStatus: cartInfores[0].cartStatus,
      };
      dispatch(loadcart(cartInfo));

      if (cartInfores.length === 0) {
        makeCart();
      }
    } catch (error) {
      console.log("error fetchCart");
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCart();
      fetchConversation(currentUser).then((conversationData) => {
        if (conversationData === "error") {
          dispatch({
            type: "NOTIFY",
            payload: {
              loading: false,
              success: false,
              error: true,
              message: "Lỗi tạo cuộc trò chuyện",
            },
          });
          return;
        }
        dispatch(loadConversation(conversationData as IConversationState));
        setOpenSnack(true);
      });
      setOpenSnack(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentCart._id) {
      fetchCartItem();
    }
  }, [currentCart]);

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < 10 || prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setOpenSnack(false);
  };

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <div>
          <header
            className={`fixed top-0 z-30 w-full transition-all duration-300 
        ${visible ? "visible" : "invisible"}
        ${visible ? "opacity-100" : "opacity-0"}
        `}
          >
            <Header />
          </header>
          <main className="">
            <div className="xl:mt-40"></div>
            <Outlet />
            {/* <div className="absolute top-40 h-full w-full">{snow()}</div> */}
            {/* Notify */}
            <SuccessNotify />
            <InformationNotify />
            <ErrorNotify />
            {/* Load all product */}
            <LoadAllProduct />
            {/* <Chatbot></Chatbot> */}
          </main>
          <Footer />
          <CustomeDrawer />

          <Stack sx={{ width: "90%" }} spacing={2}>
            <Snackbar
              open={openSnack}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              {/* <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Chào mừng bạn đến với NGUYEN'S HOME
              </Alert> */}
              <p className="rounded-sm border-2 bg-white p-4 text-dark-0">
                Chào mừng bạn đến với NGUYEN'S HOME!
              </p>
            </Snackbar>
          </Stack>
        </div>
      </Suspense>
    </>
  );
};

export default RootPage;
