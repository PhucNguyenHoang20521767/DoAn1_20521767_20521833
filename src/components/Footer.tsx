import React, { useState, useEffect, useRef } from 'react';

type Props = {};

const Footer = (props: Props) => {
    return (
        <>
        <footer className="relative bg-dark-1 pt-0">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                <div className="w-full lg:w-6/12 px-4 pt-10">
                    {/* Logo */}
                    <div className='flex w-full items-center'>
                        <a className='hidden phone:flex' href="#">
                            <img src="./src/img/logo-blue.png" alt="logo" className='h-20 w-15'/>
                        </a>
                        <a href="#" className='item-center pt-3 pl-2'>
                            <div className='text-white text-2xl whitespace-nowrap'>NGUYEN'S HOME</div>
                            <div className='flex justify-center'>
                            <div className='text-white text-base/3'>FURNITURE</div>
                            </div>    
                        </a>
                    </div>
                    <div className="mt-6 lg:mb-0 mb-6 flex justify-item">
                        <div className='hidden phone:flex items-center pr-3 text-white text-base'>THEO DÕI NGAY:</div>
                        <button className="dark-1 text-lightBlue-400 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-facebook text-white"></i></button><button className="bg-dark-1 text-lightBlue-600 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fa-brands fa-instagram text-white"></i></button><button className="bg-dark-1 text-pink-400 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fa-brands fa-google text-white"></i></button><button className="bg-dark-1 text-primary-1 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-github text-white"></i>
                        </button>
                    </div>
                </div>
                <div className="w-full lg:w-2/12 px-4 pt-10">
                    <div className="flex flex-row mb-6 items-center">
                        <div className="w-full px-4 ml-auto">
                            <span className="block text-white text-base font-semibold mb-2">NGUYEN'S HOME Furniture</span> 
                            <ul className="list-unstyled pt-3">
                            <li>
                                <a className="text-white hover:text-primary-1 block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">
                                    Sản phẩm
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-primary-1 block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">
                                    Góc cảm hứng
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-primary-1 block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">
                                    Dịch vụ
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-primary-1 block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">
                                    Về chúng tôi
                                </a>
                            </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 pt-10 flex justify-end">
                            <div className="px-6 pt-6">
                                    <div className="md:mb-6 md:ml-auto">
                                        <p className="text-white">
                                            <span>Để lại email của bạn để có thể liên tục cập nhật những
                                            ý tưởng trang trí mới, cũng như sản phẩm và các thông
                                            tin ưu đãi từ NGUYEN’S HOME
                                            </span>
                                        </p>
                                    </div>
                            <form action="">
                            <div
                                className="flex items-center">

                                    <div className="relative md:mb-6" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        className="peer block min-h-[auto] w-full bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-secondary-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="exampleFormControlInput1"
                                        placeholder="Địa chỉ mail" />
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-secondary-1 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-secondary-1 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-secondary-200 dark:peer-focus:text-secondary-200"
                                        >Email của bạn
                                    </label>
                                    </div>

                                    <div className="mb-6 md:mr-auto pl-3">
                                    <button
                                        className="inline-block bg-primary-1 hover:bg-black text-white font-bold py-2 px-4 left-3 top-0 mb-0 max-w-[100%] leading-[1.6]">
                                        Đăng ký
                                    </button>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    {/* <hr className="my-6 border-white"/>
                    <div 
                        className="flex flex-wrap items-center md:justify-between justify-center">
                    </div> */}
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer