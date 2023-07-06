import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/redux/reducers/auth_reducers';
import { RootState } from '@/redux/store/store';
import MuiAlert, { Stack, Snackbar, IconButton } from '@mui/material';
import { Alert } from '@/utils/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomeDrawer from '../Drawer/drawer';
import LoadAllProduct from '@/components/LoadAllProduct';
import { createCart, getCustomerCart, getAllCartItem, googleLoginSuccess } from '@/api/api_function'
import { gglogin } from '@/redux/reducers/auth_reducers';
import { glogin } from '@/redux/reducers/google_reducer';
import { loadcart } from '@/redux/reducers/cart_reducers';
import { loadCartItems } from '@/redux/reducers/cartItem_reducers';


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

  useEffect(() => {
    if (isLog) {
      setOpenSnack(true);
    } else if (!isLog) {
      dispatch(logout());
    }

    if (loginType === 'google') {
      const ggLog = googleLoginSuccess();
      console.log('ggLog', ggLog)
    }
  }, [isLog]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res1 = await getCustomerCart(currentUser)
        const cartInfores = res1.data.data
        console.log('ci', cartInfores)
        const cartInfo = {
          _id: cartInfores[0]._id, 
          customerId: cartInfores[0].customerId, 
          cartStatus: cartInfores[0].cartStatus
        }
        dispatch(loadcart(cartInfo))

        if (cartInfores.length > 0) {
          const res2 = await getAllCartItem(cartInfores[0]._id, currentUser)
          const cartItems = res2.data.data
          // dispatch(loadCartItems(cartItems))
          console.log('aci', cartItems)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const makeCart = async () => {
      try {
        if (currentUser)
        await createCart(currentUser)
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser) {
      fetchCart()
    }
  }, [currentUser])

  useEffect(() => {
    const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(currentScrollPos < 10 || prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpenSnack(false);
  };

  return (
    <>
      <header className={`z-30 fixed top-0 w-full transition-all duration-300 
      ${visible ? 'visible' : 'invisible'}
      ${visible ? 'opacity-100' : 'opacity-0'}
      `}>
        <Header />
      </header>
      <main className="">
        <div className='mt-40'></div>
        <Outlet />
        {/* Load all product */}
        <LoadAllProduct />
      </main>
      <Footer />
      <CustomeDrawer/>

      <Stack sx={{ width: '90%' }} spacing={2}>
          <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Chào mừng bạn đến với NGUYEN'S HOME
            </Alert>
          </Snackbar>
        </Stack>
    </>
  );
};

export default RootPage;