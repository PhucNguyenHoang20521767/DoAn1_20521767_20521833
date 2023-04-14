import React, { useState, useEffect, useRef } from 'react';
import DateTimePick from "./Daypicker"

type Props = {};

const Signup = (props: Props) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password,  setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
      // Handle form submission here
    };
    return (
    <div className=""> 
        {/* Navigation */}
        {/* <div className="max-[1024px]:hidden font-medium text-2xl text-primary-1 pt-3 pl-3">
            <a href="/Login">Đăng ký</a>
        </div> */}

        {/* Form */}
        <div className="w-[32rem] max-[512px]:w-full p-2">
            <form onSubmit={handleSubmit} className="max-w-full mx-auto mt-2">
                {/* Basic information */}
                <div className='flex justify-center'>
                    <div className="mb-1 p-1 pr-2">
                        <label htmlFor="text" className="font-semibold text-base text-dark-1">Họ:</label>
                        <input type="text" id="lastname" name="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} 
                        className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                    </div>
                    <div className="mb-1 p-1 pl-2">
                        <label htmlFor="text" className="font-semibold text-base text-dark-1">Tên:</label>
                        <input type="text" id="firstname" name="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} 
                        className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                    </div>
                </div>

                {/* Date time picker and gender */}
                <div className='flex justify-between'>
                     {/* Date time picker */}
                    <div className="mb-1 pl-1">
                        <label htmlFor="email" className="font-semibold text-base text-dark-1">Ngày sinh:</label>
                        <div className='relative w-[14.5rem] h-2'>
                            <DateTimePick></DateTimePick>
                        </div>
                        {/* <div className="relative max-w-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input DateTimePick type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-dark-1 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                        </div> */}
                    </div>
                    {/* Gender */}
                    <div className="mb-1 p-1 pr-[10.4rem]">
                        {/* https://github.com/OMikkel/tailwind-datepicker-react */}
                        <label htmlFor="email" className="font-semibold text-base text-dark-1">Giới tính:</label>
                        <select className="bg-white border border-secondary-1 text-gray-900 text-sm rounded-sm focus:ring-white focus:border-black focus:border-2 block w-full p-1.5 dark:bg-dark-1 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {/* <option selected>Giới tính:</option> */}
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                        </select>
                    </div>
                </div>

                {/* Email */}
                <div className="mb-1 p-1">
                    <label htmlFor="email" className="font-semibold text-base text-dark-1">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                </div>

                {/* Password */}
                <div className="mb-1 p-1 relative">
                    <label htmlFor="password" className="font-semibold block text-dark-1">Mật khẩu:</label>
                    <div className="flex items-center">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                        <button type="button" className="absolute right-0 px-3 py-2 rounded-md focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>                                  
                            ) : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                        </button>
                    </div>
                </div>

                {/* Confirm password */}
                <div className="mb-1 p-1 relative">
                    <label htmlFor="confirmPassword" className="font-semibold block text-dark-1">Xác nhận mật khẩu:</label>
                    <div className="flex items-center">
                        <input type={showConfirmPassword ? "text" : "password"} id="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                        <button type="button" className="absolute right-0 px-3 py-2 rounded-md focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>                                  
                            ) : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                        </button>
                    </div>
                </div>

                <div className='mt-3 p-1'>
                    <button type="submit" className="w-full px-3 py-1 text-white bg-secondary-1 border rounded-sm border-secondary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                        ĐĂNG KÝ
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Signup;
