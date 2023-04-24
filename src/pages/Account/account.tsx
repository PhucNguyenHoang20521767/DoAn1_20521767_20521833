import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

const Account = () => {
    return (
        <div>
            <div className='flex flex-wrap'>
                <div className=" w-full lg:w-4/12">
                    <div className='pt-[5rem]'>
                        <div className="grid grid-cols-1 divide-y border">
                            <Link to='/AccountInformation' className='hover:py-3 hover:bg-black'>01</Link>
                            <Link to='/' className='hover:py-3 hover:bg-black'>01</Link>
                            <Link to='/' className='hover:py-3 hover:bg-black'>01</Link>
                            <Link to='/' className='hover:py-3 hover:bg-black'>01</Link>
                        </div>
                    </div>

                </div>
                <div className='w-full lg:w-8/12'>
                    <Link to='signin'>Đăng nhập</Link>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Account;