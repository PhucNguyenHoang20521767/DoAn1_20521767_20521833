import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '@/components/Login';
import Signup from "@/components/Signup";
import { useMediaQuery } from 'react-responsive';

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);


    const handleLogin = () => {
        setIsLogin(true);
        setIsSignUp(false);
    }

    const handleSignUp = () => {
        setIsLogin(false);
        setIsSignUp(true);
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center py-5">
            <div className="mb-6">
                <div className="flex flex-col">
                    <div className={`p-3 text-2xl font-medium lg:text-primary-1 ${isLogin ? 'text-dark-1' : 'text-primary-1'}`} onClick={() => handleLogin()}>Đăng nhập</div>
                    <div className={`p-3 text-2xl font-medium lg:hidden ${isLogin ? 'text-primary-1' : 'text-dark-1'}`}  onClick={() => handleSignUp()}>Đăng ký</div>
                    <div className={`lg:block ${isLogin ? 'block' : 'hidden'}`}>
                        <Login/>
                    </div>
                </div>
            </div>
            <div className="mb-6 lg:pl-28">
                <div className="flex flex-col">
                    <div className="p-3 text-2xl text-primary-1 font-medium lg:block hidden"  onClick={() => handleSignUp()}>Đăng ký</div>
                    <div className={`lg:block ${isLogin ? 'hidden' : 'block'}`}>
                        <Signup/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignIn;
