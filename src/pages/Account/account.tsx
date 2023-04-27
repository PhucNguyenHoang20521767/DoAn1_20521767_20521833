import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

const Account = () => {
    return (
        <div>
            <div className='flex flex-wrap'>
                <div className=" w-full h-full lg:w-2/12">
                    <div className='pt-[4rem]'>
                        <div className="grid grid-cols-1 pl-[5rem]">
                            <Link to='information' className='text-start text-lg rounded-lg py-2 hover:font-bold hover:text-dark-0 hover:py-3'>Thông tin tài khoản</Link>
                            <Link to='address' className='text-start text-lg rounded-lg py-2 hover:font-bold hover:text-dark-0 hover:py-3'>Danh sách địa chỉ</Link>
                            <Link to='bill' className='text-start text-lg rounded-lg py-2 hover:font-bold hover:text-dark-0 hover:py-3'>Hoá đơn mua hàng</Link>
                            <Link to='resetpassword' className='text-start text-lg rounded-lg py-2 hover:font-bold hover:text-dark-0 hover:py-3'>Đặt lại mật khẩu</Link>
                            {/* <Link to='logout' className='text-start text-lg rounded-lg py-2 hover:font-bold hover:text-dark-0 hover:py-3'>Đăng xuất</Link> */}
                        </div>
                    </div>

                </div>
                <div className='w-full lg:w-10/12'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Account;