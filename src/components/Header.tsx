import Account from "@/pages/Account/account";
import Home from "@/pages/Home/home";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";

import { mainApi } from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";
import { logout } from "@/redux/reducers/auth_reducers";

import { useDispatch, useSelector } from "react-redux";
import { openFavourite, openCart } from "@/redux/reducers/drawer_reducers";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import { get } from "http";
import cat from "@/utils/image_link";
import CategoriesById from "./CategoriesById";
import CategoryList from "./Categories";
import SubCategoryList from "./SubCategories";
import { googleLogout } from "@/api/api_function";
import { FiShoppingCart } from "react-icons/fi";
import { removeSub } from "@/redux/reducers/subCategories";
import { notProduct } from "@/redux/reducers/slug_reducers";
import HeaderSearch from "./HeaderSearch";
import Search from "antd/es/input/Search";

type Props = {};

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUsers = useSelector((state: RootState) => state.auth.id);
  const loginType = useSelector((state: RootState) => state.auth.loginType);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const cartCount = cartItems.reduce(
    (acc, item) => acc + item.productQuantity,
    0
  );
  const [cartCountState, setCartCountState] = useState(cartCount);
  const [nav, setNav] = useState(false);

  const handleRemoveSub = () => {
    dispatch(removeSub());
    dispatch(notProduct());
  };

  useEffect(() => {
    if (currentUsers) {
      setCartCountState(cartCount);
    }
  }, [cartCount]);

  const handleNav = () => {
    setNav((prev) => !prev);
  };

  const mediaQuery = window.matchMedia("(min-width: 1200px)");

  function handleMediaQuery(mediaQuery: any) {
    if (mediaQuery.matches) {
      setNav(false); // if screen size is greater than "xl", show the nav element
    } else {
      setNav(true); // if screen size is less than "xl", hide the nav element
    }
  }

  useEffect(() => {
    handleMediaQuery(mediaQuery);
    mediaQuery.addListener(handleMediaQuery);
  }, []);

  const handleLogout = async () => {
    try {
      console.log("currentid", currentUsers);
      const result = await mainApi
        .post(
          apiEndpoints.LOGOUT(currentUsers),
          apiEndpoints.logoutCustomer(currentUsers)
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

      if (loginType === "google") {
        googleLogout();
      } else {
        dispatch(logout());
        navigate("/signin");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <nav className="shadow-md">
      {/* Logo + information */}
      <div className="">
        <section className="relative mx-auto">
          <div className="w-full bg-white text-white md:flex">
            <div className="mx-auto w-full px-5 py-4 md:flex md:max-w-[95%] md:items-center md:justify-between xl:px-8">
              {/* Logo */}
              <div className="flex flex-row">
                <NavLink to="/" className="flex">
                  <img src="/logo-nobg.webp" alt="logo" className="w-15 h-20" />
                </NavLink>
                <NavLink
                  to="/"
                  className="item-center flex flex-col justify-center pt-3"
                >
                  <div className="whitespace-nowrap text-2xl font-medium text-primary-0">
                    NGUYEN'S HOME
                  </div>
                  <div className="flex justify-center">
                    <div className="text-base/3 font-medium text-dark-1">
                      FURNITURE
                    </div>
                  </div>
                </NavLink>
              </div>

              {/* Icon */}
              <div className="hidden space-x-4 md:flex md:items-center">
                {/* Search */}
                <div>
                  <HeaderSearch />
                </div>

                {/* Favourite */}
                <button
                  className="flex items-center p-3 hover:text-gray-200"
                  onClick={() => dispatch(openFavourite())}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:h-7 hover:w-7 hover:text-secondary-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#32435F"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                <button
                  className="relative flex items-center p-3 hover:text-gray-200"
                  onClick={() => dispatch(openCart())}
                >
                  {/* <FiShoppingCart className='h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7' /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:h-7 hover:w-7 hover:text-secondary-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#32435F"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCountState > 0 && (
                    // <span className='animate-ping absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full px-1 text-xs'>
                    //   {cartCountState}
                    // </span>
                    <span className="absolute -mt-5 ml-4 flex">
                      <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-red-300 opacity-75"></span>
                      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                        <div className="text-white ">{cartCountState}</div>
                      </span>
                    </span>
                  )}
                </button>

                <div className="group relative inline-block p-3 text-left ">
                  <a className="btn btn-ghost rounded-btn flex items-center hover:text-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hover:h-7 hover:w-7 hover:text-secondary-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#32435F"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                  {isLogin ? (
                    <div className="absolute right-0 z-40 hidden w-32 bg-white p-2 shadow-md group-hover:block group-focus:block">
                      <NavLink
                        to="account"
                        className="block px-4 py-2 text-center text-black hover:bg-gray-200"
                      >
                        Tài khoản
                      </NavLink>
                      {/* <NavLink to="account" className="lg:hidden block px-4 py-2 hover:bg-gray-200 text-black">Giỏ hàng</NavLink> */}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 font-bold text-primary-1 hover:bg-primary-1 hover:text-white"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <div className="absolute right-0 z-40 hidden w-32 bg-white p-2 shadow-md group-hover:block group-focus:block">
                      <NavLink
                        to="signin"
                        className="block px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Đăng nhập
                      </NavLink>
                    </div>
                  )}
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
            <section className="mx-4 flex items-center md:hidden">
              {/* Favourite */}
              <button
                className="flex items-center p-3 hover:text-gray-200"
                onClick={() => dispatch(openFavourite())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:h-7 hover:w-7 hover:text-secondary-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#32435F"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              <button
                className="relative flex items-center p-3 hover:text-gray-200"
                onClick={() => dispatch(openCart())}
              >
                {/* <FiShoppingCart className='h-6 w-6 hover:text-secondary-1 hover:h-7 hover:w-7' /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:h-7 hover:w-7 hover:text-secondary-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#32435F"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCountState > 0 && (
                  // <span className='animate-ping absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full px-1 text-xs'>
                  //   {cartCountState}
                  // </span>
                  <span className="absolute -mt-5 ml-4 flex">
                    <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-red-300 opacity-75"></span>
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                      <div className="text-white ">{cartCountState}</div>
                    </span>
                  </span>
                )}
              </button>

              <div className="group relative inline-block p-3 text-left ">
                <a className="btn btn-ghost rounded-btn flex items-center hover:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:h-7 hover:w-7 hover:text-secondary-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#32435F"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
                {isLogin ? (
                  <div className="absolute right-0 z-40 hidden w-32 bg-white p-2 shadow-md group-hover:block group-focus:block">
                    <NavLink
                      to="account"
                      className="block px-4 py-2 text-center text-black hover:bg-gray-200"
                    >
                      Tài khoản
                    </NavLink>
                    {/* <NavLink to="account" className="lg:hidden block px-4 py-2 hover:bg-gray-200 text-black">Giỏ hàng</NavLink> */}
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 font-bold text-primary-1 hover:bg-primary-1 hover:text-white"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <div className="absolute right-0 z-40 hidden w-32 bg-white p-2 shadow-md group-hover:block group-focus:block">
                    <NavLink
                      to="signin"
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                    >
                      Đăng nhập
                    </NavLink>
                  </div>
                )}
              </div>
              <a
                className="navbar-burger mr-12 self-center px-2 xl:hidden"
                onClick={handleNav}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#32435F"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </a>
            </section>
          </div>
        </section>
      </div>
      {/* Navbar */}
      <div className="relative my-auto bg-white">
        {/* <nav className="hidden md:flex justify-center md:items-center flex-wrap plr-6"> */}
        <nav
          className={
            nav
              ? "hidden"
              : "plr-6 flex-wrap justify-center md:flex md:items-center"
          }
        >
          <div className="lg:flex lg:w-auto">
            <div className="block bg-white py-4 transition md:hidden">
              <div className="mx-2">
                <HeaderSearch />
              </div>
            </div>
            <div className="text-base md:shrink-0">
              <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color block px-12 py-3 text-center lg:inline-block">
                <Link
                  to="product"
                  className="text-primary-0"
                  onClick={handleRemoveSub}
                >
                  SẢN PHẨM
                </Link>
                <div className="invisible absolute left-0 z-10 mt-3 h-0 w-0 bg-white p-2 shadow-md transition-height duration-700 group-hover/product-nav-item:visible group-hover/product-nav-item:h-max group-hover/product-nav-item:w-full">
                  <div className="flex flex-col">
                    <Link
                      to={"product"}
                      onClick={handleRemoveSub}
                      className="block"
                    >
                      <p className="block w-full px-[10rem] py-2 text-base font-semibold text-black hover:bg-gray-200 md:px-10">
                        Tất cả sản phẩm
                      </p>
                    </Link>
                    <CategoryList />
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
                <a className="cursor-pointer text-primary-0">PHÒNG</a>
                <div className="invisible absolute left-0 z-10 mt-3 h-0 w-0 bg-white p-2 shadow-md transition-height duration-700 group-hover/product-nav-item:visible group-hover/product-nav-item:h-max group-hover/product-nav-item:w-full">
                  <div className="flex justify-center">
                    <SubCategoryList />
                  </div>
                </div>
              </div>
              <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
                <Link to={"blog/news"}>
                  <button className="text-primary-0">GÓC CẢM HỨNG</button>
                </Link>
                {/* <div className="bg-white absolute shadow-md z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-max group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Góc cảm hứng
                    </a>
                  </div>
                </div> */}
              </div>
              <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
                <Link to={"service"}>
                  <button className="text-primary-0">DỊCH VỤ</button>
                </Link>
                {/* <div className="bg-white absolute shadow-md z-10 invisible p-2 mt-3 w-0 h-0 left-0 group-hover/product-nav-item:w-full group-hover/product-nav-item:h-max group-hover/product-nav-item:visible transition-height duration-700">
                  <div className="flex flex-row">
                    <a href="#">
                      Dịch vụ
                    </a>
                  </div>
                </div> */}
              </div>
              <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
                <NavLink to={"aboutus"} className="text-primary-0">
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
  );
};

export default Header;
