import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import {mainApi} from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";

import {useDispatch, useSelector} from "react-redux";
import {login} from "@/redux/reducers/auth_reducers";
import { RootState } from '@/redux/store/store';

import MuiAlert, { Stack, Snackbar, IconButton} from "@mui/material";
import { Alert } from '@/utils/ui';

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const rootpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLog = useSelector((state: RootState) => state.auth.isLogin);

    const [openSnack, setOpenSnack] = useState(false);

    useEffect(() => {
        if(isLog) {
            setOpenSnack(true);
        }
    }, [isLog])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnack(false);
      };

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Đăng nhập thành công
                        </Alert>
                    </Snackbar>
                </Stack>
                <Outlet></Outlet>
            </main>
            <Footer/>

        </>
    )
}

export default rootpage