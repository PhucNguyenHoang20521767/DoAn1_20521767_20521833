import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from '@/components/Login';
import Signup from "@/components/Signup";
import { useMediaQuery } from 'react-responsive';

import {Box, Button, Typography, Modal} from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { matchIsNumeric } from '@/utils/numberCheck';

import { mainApi } from '@/api/main_api'
import * as apiEndpoints from '@/api/api_endpoints';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const SignIn = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [open, setOpen] = useState(false);
    const [otp, setOTP] = useState('');
    const [idToken, setIdToken] = useState('');
    const [done, setDone] = useState(false);    
    const [loginEmail, setLoginEmail] = useState('');

    const handleLogin = () => {
        setIsLogin(true);
        setIsSignUp(false);
    }

    const handleSignUp = () => {
        setIsLogin(false);
        setIsSignUp(true);
    }

    const validateChar = (value: string, index: number): boolean => {
        return matchIsNumeric(value)
      }

    const handleChange = (newValue: string) => {
        setOTP(newValue)
      }
    
    const handleComplete = async (finalValue: string) => {
        const theOtp = finalValue;
        try {
            const result = await mainApi.post(
                apiEndpoints.GET_OTP,
                apiEndpoints.getOTPBody(idToken, theOtp)
            );
            setDone(true);
            alert('Xác nhận thành công!');
        } catch (error: any) {
            console.log(error);
        }
            handleClose();
            navigate("/")
      }

      
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    
    return (
        <div className="flex flex-col lg:flex-row justify-center py-5">
            <div className="mb-6">
                <div className="flex flex-col">
                    <div className={`p-3 text-2xl font-medium lg:text-primary-1 ${isLogin ? 'text-dark-1' : 'text-primary-1'}`} onClick={() => handleLogin()}>Đăng nhập</div>
                    <div className={`p-3 text-2xl font-medium lg:hidden ${isLogin ? 'text-primary-1' : 'text-dark-1'}`}  onClick={() => handleSignUp()}>Đăng ký</div>
                    <div className={`lg:block ${isLogin ? 'block' : 'hidden'}`}>
                        <Login
                            idToken={idToken}
                            setIdToken={setIdToken}
                            handleOpen={handleOpen}
                            setLoginEmail={setLoginEmail}
                            loginEmail={loginEmail}
                        />
                    </div>
                </div>
            </div>
            <div className="mb-6 lg:pl-28">
                <div className="flex flex-col">
                    <div className="p-3 text-2xl text-primary-1 font-medium lg:block hidden"  onClick={() => handleSignUp()}>Đăng ký</div>
                    <div className={`lg:block ${isLogin ? 'hidden' : 'block'}`}>
                        <Signup
                            idToken={idToken}
                            setIdToken={setIdToken}
                            handleOpen={handleOpen}
                        />
                    </div>
                </div>
            </div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography 
                    id="modal-modal-title" 
                    variant="h6" 
                    component="h2" 
                    className='text-center' 
                    sx={{ fontFamily: 'EB Garamond', mb: 2 }}
                    >
                        Nhập OTP được gửi đến email của bạn
                    </Typography>
                    <MuiOtpInput
                        value={otp}
                        onChange={handleChange}
                        onComplete={handleComplete}
                        length={6}
                        validateChar={validateChar}
                        />
                    </Box>
                </Modal>
        </div>
    )
};

export default SignIn;
