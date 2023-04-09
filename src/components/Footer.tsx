import React, { useState, useEffect, useRef } from 'react';

type Props = {};

const Footer = (props: Props) => {
    return (
        <>
        <footer className="relative bg-dark-1 pt-0">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-4/12 px-4 py-10 flex flex-col justify-center">
                        <div className="px-4">
                            {/* Logo in footer */}
                            <div className='flex w-full items-center'>
                                <a className='hidden phone:flex' href="#">
                                    <img src="./src/assets/logo-blue.png" alt="logo" className='h-20 w-15'/>
                                </a>
                                <a href="#" className='item-center pt-3 pl-2'>
                                    <div className='text-white text-2xl whitespace-nowrap'>NGUYEN'S HOME</div>
                                    <div className='flex justify-center'>
                                        <div className='text-white text-base/3'>FURNITURE</div>
                                    </div>    
                                </a>
                            </div>
                            {/* Follow us */}
                            <div className="mt-6 lg:mb-0  flex justify-start items-center">
                                <div className='hidden phone:flex items-center pr-3 text-white text-lg font-normal'>FOLLOW US:</div>
                                <button className="bg-dark-1 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i className="fab fa-facebook text-white text-xl"></i>
                                </button>
                                <button className="bg-dark-1 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i className="fa-brands fa-instagram text-white text-xl"></i>
                                </button>
                                <button className="bg-dark-1 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i className="fa-brands fa-google text-white text-xl"></i>
                                </button>
                                <button className="bg-dark-1 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i className="fab fa-github text-white text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Nav bar summary */}
                    <div className="w-full lg:w-4/12 px-4 py-10 flex flex-col justify-center">
                        <div>
                            <div className="w-full px-4 ml-auto">
                                <span className="block text-white text-lg font-semibold mb-2 whitespace-nowrap">NGUYEN'S HOME Furniture</span> 
                                <ul className="list-unstyled pt-3">
                                <li>
                                    <a className="text-white hover:text-primary-1 block pb-2" href="https://www.creative-tim.com/presentation?ref=njs-profile">
                                        Sản phẩm
                                    </a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-primary-1 block pb-2" href="https://blog.creative-tim.com?ref=njs-profile">
                                        Góc cảm hứng
                                    </a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-primary-1 block pb-2" href="https://www.github.com/creativetimofficial?ref=njs-profile">
                                        Dịch vụ
                                    </a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-primary-1 block pb-2" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">
                                        Về chúng tôi
                                    </a>
                                </li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    {/* Send Email */}
                    <div className="w-full lg:w-4/12 px-4 py-10">
                            <div className="px-4 py-6 flex flex-col justify-center">
                                    <div className="md:mb-6 md:ml-auto mb-6">
                                        <p className="text-white text-base text-justify">
                                            <span>Để lại email của bạn để có thể liên tục cập nhật những ý tưởng trang trí mới, cũng như sản phẩm và các thông tin ưu đãi từ NGUYEN’S HOME</span>
                                        </p>
                                    </div>
                            <form action="">
                                <div className="flex flex-row">
                                    <div className="relative md:mb-6 w-full" data-te-input-wrapper-init>
                                        <input
                                            type="email"
                                            className="w-full peer m-0 block h-[58px] bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-dark-1 ease-in-out placeholder:text-transparent focus:border-primary focus:bg-white focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-dark-1 focus:shadow-te-primary focus:outline-none [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                            id="floatingInput"
                                            placeholder="email" />
                                        <label
                                            htmlFor="floatingInput"
                                            className="pointer-events-none whitespace-nowrap absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-primary-1 transition-[opacity,_transform] duration-100 ease-in-out peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:opacity-[0.65] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[0.65] motion-reduce:transition-none"
                                            >Email của bạn
                                        </label>
                                    </div>

                                    <div className="md:mr-auto pl-3">
                                        <button
                                            className="h-[58px] max-h-[58px] w-full whitespace-nowrap first-letter: inline-block bg-primary-1 hover:bg-black text-white font-bold py-2 px-4 left-3 top-0 mb-0 max-w-[100%] leading-[1.6]">
                                            ĐĂNG KÝ
                                        </button>
                                    </div>
                                </div>
                            </form>
                            </div>
                    </div>

                    {/* Add comment below if you want to make footer bigger */}

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