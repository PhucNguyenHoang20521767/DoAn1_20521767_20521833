import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/redux/reducers/auth_reducers";
import { RootState } from "@/redux/store/store";
import MuiAlert, { Stack, Snackbar, IconButton } from "@mui/material";
import { Alert } from "@/utils/ui";
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

const RootPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginType = useSelector((state: RootState) => state.auth.loginType);
  const isLog = useSelector((state: RootState) => state.auth.isLogin);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const currentCart = useSelector((state: RootState) => state.cart);
  const [openSnack, setOpenSnack] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   if (currentUser) {
  //     setOpenSnack(true);
  //   } else if (!currentUser) {
  //     dispatch(logout());
  //   }
  // }, [currentUser]);

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
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res1 = await getCustomerCart(currentUser);
        const cartInfores = res1.data.data;
        console.log("ci", cartInfores);
        const cartInfo = {
          _id: cartInfores[0]._id,
          customerId: cartInfores[0].customerId,
          cartStatus: cartInfores[0].cartStatus,
        };
        dispatch(loadcart(cartInfo));

        if (cartInfores.length > 0) {
          const res2 = await getAllCartItem(cartInfores[0]._id, currentUser);
          const cartItems = res2.data.data;
          // dispatch(loadCartItems(cartItems))
          console.log("aci", cartItems);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const makeCart = async () => {
      try {
        if (currentUser) await createCart(currentUser);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser) {
      fetchCart();
      setOpenSnack(true);
    }
  }, [currentUser]);

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
      <header
        className={`fixed top-0 z-30 w-full transition-all duration-300 
      ${visible ? "visible" : "invisible"}
      ${visible ? "opacity-100" : "opacity-0"}
      `}
      >
        <Header />
      </header>
      <main className="">
        <div className="mt-40"></div>
        <Outlet />
        {/* Notify */}
        <SuccessNotify />
        <InformationNotify />
        <ErrorNotify />
        {/* Load all product */}
        <LoadAllProduct />
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
    </>
  );
};

export default RootPage;
