import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '@/components/Login';
import Signup from "@/components/Signup";
import { useMediaQuery } from 'react-responsive';

// const LoginAndSignup = () => {
//     return (
//         <div className="px-8 mb-6 flex justify-center">
//             <div className="max-lg:hidden font-medium text-2xl text-primary-1 pt-3 pl-3">
//                 <Link to="/Log" className="hover:text-dark-1">Đăng nhập</Link>
//             </div>
//             <div className="max-lg:hidden font-medium text-2xl text-primary-1 pt-3 pl-3">
//                 <Link to="/Sign" className="hover:text-dark-1">Đăng ký</Link>
//             </div>
//         </div>
//     )
// }

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(true);
    const isTablet = useMediaQuery({ maxWidth: 1024 });

    const handleLogin = () => {
        setIsLogin(true);
        setIsSignup(false);
    }

    const handleSignup = () => {
        setIsLogin(false);
        setIsSignup(true);
    }

    const handleBoth = () => {
        setIsLogin(true);
        setIsSignup(true);
    }

    return (
        <BrowserRouter>
            <div className="relative flex flex-col justify-center lg:items-center">
                <div className="mb-6">
                    <div className="font-medium text-2xl text-primary-1 pt-3 pl-3">
                        <div className=''>
                            <Link to="/Login" className={`hover:text-dark-1 ${isLogin ? 'text-dark-1' : ''}`} onClick={() => handleLogin()}>Đăng nhập</Link>
                            <Link to="/Signup" className={`hover:text-dark-1 ${!isLogin ? 'text-dark-1' : ''}`} onClick={() => handleSignup()}>/ Đăng ký</Link>
                        </div>
                    </div>
                </div>
                {/* Desktop version */}
                {/* {!isTablet && (
                    <>
                        <div className="px-8 mb-6">
                            <div className="max-lg:hidden font-medium text-2xl text-primary-1 pt-3 pl-3">
                                <Link to="/LoginSignup" className={"hover:text-dark-1"} onClick={() => handleBoth()}></Link>
                            </div>
                        </div>
                    </>
                )} */}


                {/* Tablet version */}
                {/* {isTablet && (
                    <div className="px-8 mb-6">
                        <div className="lg:block min-[1392px]:px-[10rem] px-8 w-screen">
                            <div className="font-medium text-2xl text-primary-1 pt-3 pl-3">
                                <div className='relative'>
                                    <Link to="/Login" className={`hover:text-dark-1 ${isLogin ? 'text-dark-1' : ''}`} onClick={() => handleLogin()}>Đăng nhập</Link>
                                    <Link to="/Signup" className={`hover:text-dark-1 ${!isLogin ? 'text-dark-1' : ''}`} onClick={() => handleSignup()}>/ Đăng ký</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}
                { /* Display both login and signup form on larger screens */ }
                <Routes>
                    {/* <Route path='/LoginSignup'>
                        <Route path='/LoginSignup/Log' element={<Login/>}/>
                        <Route path='/LoginSignup/Sign' element={<Signup/>}/>
                    </Route> */}
                    <Route path='/Login' element={<Login/>}/>
                    <Route path='/Signup' element={<Signup/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
};

export default SignIn;
