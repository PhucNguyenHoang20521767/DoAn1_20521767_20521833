import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/redux/reducers/auth_reducers';
import { RootState } from '@/redux/store/store';
import MuiAlert, { Stack, Snackbar, IconButton } from '@mui/material';
import { Alert } from '@/utils/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RootPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      <header className={`z-30 fixed top-0 w-full transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
      </header>
      <main className="">
        <div className='mt-40'></div>
        <Outlet />
      </main>
      <Footer />
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