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

import { gglogin } from '@/redux/reducers/auth_reducers';
import { glogin } from '@/redux/reducers/google_reducer';

const RootPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginType = useSelector((state: RootState) => state.auth.loginType);
  const isLog = useSelector((state: RootState) => state.auth.isLogin);
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
      fetch('https://nguyenshomefurniture-be.onrender.com/api/auth/google/login/success')
      .then(response => response.json())
      .then(data => {
        dispatch(glogin(data));
      })
      .catch(error => {
        // handle the error here
        console.log(error);
      });
    }
  }, [isLog]);

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