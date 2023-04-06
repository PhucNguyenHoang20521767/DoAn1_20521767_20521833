import React, { useState, useEffect, useRef } from 'react';

type Props = {};

const Header = (props: Props) => {
  //return
  return (
    <div className=''>
      {/* Logo + information */}
      <div className="flex flex-wrap">
        <section className="relative mx-auto">
          <nav className="flex bg-white text-white w-screen">
            <div className="px-5 xl:px-8 py-2 flex w-full items-center">
              {/* Logo */}
              <a className='hidden phone:flex' href="#">
                <img src="./src/img/logo-nobg.png" alt="logo" className='h-20 w-15'/>
              </a>
              <a href="#" className='item-center pt-3'>
                <div className='text-primary-0 text-2xl whitespace-nowrap'>NGUYEN'S HOME</div>
                <div className='flex justify-center'>
                  <div className='text-dark-1 text-base/3'>FURNITURE</div>
                </div>    
              </a>

              <div className="md:flex mx-auto"></div>
              {/* Icon */}
              {/* <div className="xl:flex justify-end space-x-5"> */}
              {/* <div className='flex justify-end'> */}
              <div className="hidden xl:flex items-center space-x-5">
                {/* Search */}
                <a className='p-3' href="#">
                  <div className="search-container">
                    <form action="/search" method="get">
                      <input className="search expandright" id="searchright" type="search" name="q" placeholder="Search"/>
                      <label className="button searchbutton" htmlFor="searchright"><span className="mglass">&#9906;</span></label>
                    </form>
                  </div>
                </a>
                <a className="flex items-center hover:text-gray-200 p-3" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </a>
                <a className="flex items-center hover:text-gray-200 p-3" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary-1 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-1">
                      </span>
                    </span>
                </a>
                {/* sign in */}
                <a className="flex items-center hover:text-gray-200 p-3" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
              </div>
            </div>
            {/* responsive navbar */}
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
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="#32435F">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>
          </nav>
          
        </section>
      </div>
      {/* Nav bar */}
      <div className='bg-white shadow-md'>
        <nav className="hidden md:flex justify-center md:items-center flex-wrap plr-6">
          {/* Hidden button */}
          {/* <div className="block tablet:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-primary-0 border-primary-1 hover:text-white hover:primary-1">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div> */}
          {/* Nav bar */}
          <div className="lg:w-auto lg:flex">
            {/* w-full block flex-grow lg:flex lg:items-center lg:w-auto */}
            <div className="text-base md:shrink-0">
              {/* text-base lg:flex-grow flex md:justify-center */}
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-0 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                SẢN PHẨM
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-0 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                PHÒNG
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-0 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                GÓC CẢM HỨNG
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-0 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                DỊCH VỤ
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-0 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                VỀ CHÚNG TÔI
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
};

export default Header;