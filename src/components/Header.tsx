import React, { useState, useEffect } from 'react';

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      {/* Logo + information */}
      <div className='pl-10 pr-16 bg-secondary-5 lg:flex-grow flex'>
        {/* <div className='justify-items-start row-span-1'> */}
        {/* Logo */}
        <div className='lg:flex-grow flex'>
          <a href="#">
            <img src="./src/img/logo.png" alt="logo" className='object-scale-down h-20 w-15'/>
          </a>
          <a href="#" className='item-center pt-6'>
            <div className='text-primary-1 text-2xl'>NGUYEN'S HOME</div>
            <div className='flex justify-center'>
              <div className='text-dark-1 text-base/3'>FURNITURE</div>
            </div>    
          </a>
        </div>
        {/* Information */}
        <div className='flex items-end pb-2'>
        <nav className="flex items-center justify-center flex-wrap plr-6">
          {/* Nav bar */}
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-base lg:flex-grow flex justidfy-center md:justify-end">
              <a href="#responsive-header" className="">
                {/* Search bar */}
                <div className="body flex pt-2 relative mx-auto bg-blue-100">
                  <div className="flex justify-center items-center  rounded-lg bg-white relative">
                    <div className="search-icon bg-blue-500 hover:bg-blue-400 text-white px-4 py-4 rounded-lg relative z-10 shadow-md">
                      <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <input className="search-input rounded-r-lg text-2xl text-blue-500 outline-none focus:outline-none:focus" type="search" aria-live="polite" placeholder="Files, Names..."/>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </nav>
        </div>
      </div>
      {/* Nav bar */}
      <div className='bg-secondary-5'>
        <nav className="flex items-center justify-center flex-wrap plr-6">
          {/* Hidden button */}
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-primary-1 border-primary-1 hover:text-white hover:primary-1">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          {/* Nav bar */}
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-base lg:flex-grow flex md:justify-center">
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-1 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
               SẢN PHẨM
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-1 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                PHÒNG
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-1 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                GÓC CẢM HỨNG
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-1 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                DỊCH VỤ
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-primary-1 hover:border-primary-1 hover:bg-primary-1 py-3 px-12 hover:text-white">
                VỀ CHÚNG TÔI
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
};

export default Header;