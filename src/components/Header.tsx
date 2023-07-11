import Account from '@/pages/Account/account';
import Home from '@/pages/Home/home';
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

import { mainApi } from '@/api/main_api';
import * as apiEndpoints from '@/api/api_endpoints';
import { logout } from '@/redux/reducers/auth_reducers';

import { useDispatch, useSelector } from 'react-redux';
import { openFavourite, openCart } from '@/redux/reducers/drawer_reducers';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store/store';
import { get } from 'http';
import cat from '@/utils/image_link';
import CategoriesById from './CategoriesById';
import CategoryList from './Categories';
import SubCategoryList from './SubCategories';
import { googleLogout } from '@/api/api_function';
import { FiShoppingCart } from 'react-icons/fi';
import { removeSub } from '@/redux/reducers/subCategories';
import { notProduct } from '@/redux/reducers/slug_reducers';
import HeaderSearch from './HeaderSearch';

type Props = {};

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUsers = useSelector((state: RootState) => state.auth.id);
  const loginType = useSelector((state: RootState) => state.auth.loginType)
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.productQuantity, 0);
  const [cartCountState, setCartCountState] = useState(cartCount);
  const [nav, setNav] = useState(false);
  const [loginState, setLoginState] = useState(false);

  const handleRemoveSub = () => {
    dispatch(removeSub());
    dispatch(notProduct());
  };

  useEffect (() => {
    if (currentUsers) {
      setCartCountState(cartCount);
    }
  }, [cartCount]);

  const handleNav = () => {
    setNav(!nav);
  };

  const mediaQuery = window.matchMedia('(min-width: 1200px)');

  function handleMediaQuery(mediaQuery: any) {
    if (mediaQuery.matches) {
      setNav(false) // if screen size is greater than "xl", show the nav element
    } else {
      setNav(true) // if screen size is less than "xl", hide the nav element
    }
  }

  useEffect(() => {
    handleMediaQuery(mediaQuery); 
    mediaQuery.addListener(handleMediaQuery);
  }
  , []);

  const handleLogout = async () => {
    try {
      console.log('currentid', currentUsers);
      const result = await mainApi.post(
        apiEndpoints.LOGOUT(currentUsers),
        apiEndpoints.logoutCustomer(currentUsers)
        ).then(
          (res) => {
            console.log(res);
          }
        ).catch(error => {
          console.log(error);
        })

      if (loginType === 'google') {
        googleLogout();
      } else {
        dispatch(logout());
        navigate('/signin');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <nav className='shadow-md'>
      {/* Logo + information */}
      <div className="">
        <section className="relative mx-auto">
          <div className="flex bg-white text-white w-full">
            <div className="px-5 xl:px-8 py-4 flex w-full mx-auto max-w-[95%] justify-between items-center">
              {/* Logo */}
              <div className="flex flex-row min-w-max">
                <NavLink to="/" className='hidden phone:flex'>
                  <img src="/logo-nobg.webp" alt="logo" className='h-20 w-15'/>
                </NavLink>
                <NavLink to='/' className='item-center pt-3 flex flex-col justify-center'>
                  <div className='text-primary-0 text-2xl whitespace-nowrap font-medium'>NGUYEN'S HOME</div>
                  <div className='flex justify-center'>
                    <div className='text-dark-1 text-base/3 font-medium'>FURNITURE</div>
                  </div>    
                </NavLink>
              </div>

              {/* Icon */}
              <div className="hidden xl:flex items-center space-x-8">
                {/* Search */}
                <HeaderSearch />

                {/* Favourite */}
                <button className="flex items-center hover:text-gray-200 p-3"
                onClick={() => dispatch(openFavourite())}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Cart */}
                {/* <button className="flex items-center hover:text-gray-200 p-3"
                onClick={() => dispatch(openCart())}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary-1 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-1">
                      </span>
                    </span>
                </button> */}
                <button
                  className='flex items-center hover:text-gray-200 p-3 relative'
                  onClick={() => dispatch(openCart())}
                >
                  {/* <FiShoppingCart className='h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7' /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartCountState > 0 && (
                    // <span className='animate-ping absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full px-1 text-xs'>
                    //   {cartCountState}
                    // </span>
                    <span className="flex absolute -mt-5 ml-4">
                      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-300 opacity-75">
                      </span>
                      <span className="relative rounded-full h-5 w-5 bg-red-500 flex items-center justify-center">
                        <div className='text-white '>
                          {cartCountState}
                        </div>
                      </span>
                    </span>
                  )}
                </button>

                <div className='relative inline-block text-left group'>
                  <a className="flex items-center hover:text-gray-200 p-3 btn btn-ghost rounded-btn" >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </a>
                  {
                    isLogin ?
                    (
                  <div className="z-40 absolute right-0 hidden group-hover:block group-focus:block bg-white shadow-md p-2 w-32">          
                    <NavLink to="account" className="block text-center px-4 py-2 hover:bg-gray-200 text-black">Tài khoản</NavLink>
                    {/* <NavLink to="account" className="lg:hidden block px-4 py-2 hover:bg-gray-200 text-black">Giỏ hàng</NavLink> */}
                    <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 hover:bg-primary-1 hover:text-white text-primary-1 font-bold" 
                    >Đăng xuất</button>
                  </div>
                    )
                    :
                    (
                  <div className="z-40 absolute right-0 hidden group-hover:block group-focus:block bg-white shadow-md p-2 w-32">
                    <NavLink to="signin" className="block px-4 py-2 hover:bg-gray-200 text-black">Đăng nhập</NavLink>
                  </div>
                    )
                  }
                </div>
              </div>
            </div>
            {/* Responsive Navbar */}
            {/* Cart */}
            {/* <a className="xl:hidden flex mr-6 items-center" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary-1 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-1">
                </span>
              </span>
            </a> */}
            <button
                  className='xl:hidden flex items-center hover:text-gray-200 p-3 relative'
                  onClick={() => dispatch(openCart())}
                >
                  {/* <FiShoppingCart className='h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7' /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartCountState > 0 && (
                    // <span className='animate-ping absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full px-1 text-xs'>
                    //   {cartCountState}
                    // </span>
                    <span className="flex absolute -mt-5 ml-4">
                      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-300 opacity-75">
                      </span>
                      <span className="relative rounded-full h-5 w-5 bg-red-500 flex items-center justify-center">
                        <div className='text-white '>
                          {cartCountState}
                        </div>
                      </span>
                    </span>
                  )}
                </button>
            {/* Expand in responsive */}
            <a className="navbar-burger self-center mr-12 xl:hidden" onClick={handleNav}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>
          </div>
          
        </section>
      </div>
      {/* Navbar */}
      <div className='bg-white relative my-auto'>
        {/* <nav className="hidden md:flex justify-center md:items-center flex-wrap plr-6"> */}
        <nav  className={
          nav
            ? 'hidden'
            : 'md:flex justify-center md:items-center flex-wrap plr-6'
        }>
          <div className="lg:w-auto lg:flex">
            <div className="text-base md:shrink-0">
              <div className="group/product-nav-item text-center block lg:inline-block py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <Link
                  to="product" 
                  className="text-primary-0"
                  onClick={handleRemoveSub}>
                  SẢN PHẨM
                </Link>
                <div className="bg-white absolute shadow-md z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-max group-hover/product-nav-item:visible transition-height duration-700">
                  <div className='flex justify-center'>
                    <CategoryList />
                    <Link to={'product'} onClick={handleRemoveSub} className='hidden md:p-1 md:block'>
                    <div className='pl-5'>
                      <img 
                      src="https://media.designcafe.com/wp-content/uploads/2021/12/27144355/design-cafe-modular-furniture-benefits.jpg" 
                      alt="All product" 
                      className='w-[400px] h-[100px] object-cover shadow-lg'
                      />
                      <p>
                        <span className='pt-2 text-md font-bold'>Tất cả sản phẩm</span>
                      </p>
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <a className="text-primary-0">
                  PHÒNG
                </a>
                <div className="bg-white absolute shadow-md z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-max group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex justify-center">
                    <SubCategoryList />
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <button className="text-primary-0">
                  GÓC CẢM HỨNG
                </button>
                {/* <div className="bg-white absolute shadow-md z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-max group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Góc cảm hứng
                    </a>
                  </div>
                </div> */}
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <button className="text-primary-0">
                  DỊCH VỤ
                </button>
                {/* <div className="bg-white absolute shadow-md z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-max group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Dịch vụ
                    </a>
                  </div>
                </div> */}
              </div>
              <div className="group/product-nav-item text-center block mt-4 lg:inline-block lg:mt-0 py-3 px-12 header-nav-item header-nav-item-underline header-nav-item-underline-color">
                <NavLink to={'aboutus'} className="text-primary-0">
                  VỀ CHÚNG TÔI
                </NavLink>
                {/* <div className="bg-white absolute shadow-md z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-max group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Về chúng tôi
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  )
};

export default Header;