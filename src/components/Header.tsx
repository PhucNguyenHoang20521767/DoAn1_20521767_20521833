import Account from '@/pages/Account/account';
import Home from '@/pages/Home/home';
import React, { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, Outlet } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className=''>
      {/* Logo + information */}
      <div className="flex flex-wrap">
        <section className="relative mx-auto">
          <nav className="flex bg-white text-white w-screen">
            <div className="px-5 xl:px-8 py-4 flex w-full justify-between items-center">
              {/* Logo */}
              <div className="flex flex-row min-w-max">
                <a className='hidden phone:flex' href="#">
                  <img src="./src/assets/logo-nobg.png" alt="logo" className='h-20 w-15'/>
                </a>
                <a href="#" className='item-center pt-3 flex flex-col justify-center'>
                  <div className='text-primary-0 text-2xl whitespace-nowrap font-medium'>NGUYEN'S HOME</div>
                  <div className='flex justify-center'>
                    <div className='text-dark-1 text-base/3 font-medium'>FURNITURE</div>
                  </div>    
                </a>
              </div>

              {/* Icon */}
              <div className="hidden xl:flex items-center space-x-8">
                {/* Search */}
                <div className="flex flex-row items-center border-2 border-dark-1 rounded-full px-5 py-2 group/search-header hover:bg-dark-1 focus-within:bg-dark-1 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-dark-1 group-hover/search-header:stroke-white group-focus-within/search-header:stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input placeholder="Nhập sản phẩm cần tìm" className="w-0 h-0 border-none rounded-lg ml-2 p-2 text-dark-1 text-lg focus:w-60 focus:h-8 group-hover/search-header:w-60 group-hover/search-header:h-8 transition-width duration-700" />
                  <div className="pl-2 text-xl text-dark-1 font-medium group-hover/search-header:text-white group-focus-within/search-header:text-white">Tìm kiếm</div>
                </div>
                <a className="flex items-center hover:text-gray-200 p-3" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </a>
                <a className="flex items-center hover:text-gray-200 p-3" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary-1 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-1">
                      </span>
                    </span>
                </a>

                <div className='relative inline-block text-left group'>
                  <Link className="flex items-center hover:text-gray-200 p-3 btn btn-ghost rounded-btn" to="/account">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </Link>
                  <div className="absolute right-0 hidden group-hover:block bg-white shadow-md p-2 w-32">
                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-200 text-black">Tài khoản</Link>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-200 text-black">Giỏ hàng</a>
                    <a href="#" className="block px-4 py-2 hover:bg-primary-1 hover:text-white text-primary-1 font-bold">Đăng xuất</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Responsive Navbar */}
            {/* Cart */}
            <a className="xl:hidden flex mr-6 items-center" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary-1 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-1">
                </span>
              </span>
            </a>
            {/* Expand in responsive */}
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>
          </nav>
          
        </section>
      </div>
      {/* Navbar */}
      <div className='bg-white shadow-md'>
        <nav className="hidden md:flex justify-center md:items-center flex-wrap plr-6">
          <div className="lg:w-auto lg:flex">
            <div className="text-base md:shrink-0">
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <a href="#responsive-header" className="text-primary-0">
                  SẢN PHẨM
                </a>
                <div className="bg-white absolute z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-60 group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Sản phẩm
                    </a>
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <a href="#responsive-header" className="text-primary-0">
                  PHÒNG
                </a>
                <div className="bg-white absolute z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-60 group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Phòng
                    </a>
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <a href="#responsive-header" className="text-primary-0">
                  GÓC CẢM HỨNG
                </a>
                <div className="bg-white absolute z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-60 group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Góc cảm hứng
                    </a>
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <a href="#responsive-header" className="text-primary-0">
                  DỊCH VỤ
                </a>
                <div className="bg-white absolute z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-60 group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Dịch vụ
                    </a>
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <a href="#responsive-header" className="text-primary-0">
                  VỀ CHÚNG TÔI
                </a>
                <div className="bg-white absolute z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-60 group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Về chúng tôi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>

    </div>
  )
};

export default Header;