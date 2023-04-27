import React, { useState, useEffect, useRef } from 'react';
import DateTimePick from "./Daypicker"

type Props = {};

const Information = (props: Props) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
      // Handle form submission here
    };

    const firstDivRef = useRef<HTMLDivElement>(null);
    const secondDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (firstDivRef.current && secondDivRef.current) {
        secondDivRef.current.style.width = firstDivRef.current.offsetWidth + 'px';
        }
    }, []);
    
    return (
    <div className="pl-[5rem] border-l-2 mt-10 flex justify-start"> 
        {/* Form */}
        <div className="w-[32rem] max-[512px]:w-full">
            <h1 className='flex justify-end text-2xl font-bold text-gray-700 mb-6'>Thông tin tài khoản</h1>
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
                        <div className='max-w-xs max-h-1'>
                            {/* https://github.com/OMikkel/tailwind-datepicker-react */}
                            <DateTimePick></DateTimePick>
                        </div>
                    </div>
                    {/* Gender */}
                    <div className="mb-1 min-[508px]:pr-[10.8rem]">
                        <label htmlFor="email" className="min-w-10 font-semibold text-base text-dark-1">Giới tính:</label>
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

                {/* Default Address */}
                <div className="mb-1 p-1">
                    <label className="font-semibold text-base text-dark-1">Địa chỉ mặt định:</label>
                    <select className="bg-white border border-secondary-1 text-gray-900 text-sm rounded-sm focus:ring-white focus:border-black focus:border-2 block w-full p-1.5 dark:bg-dark-1 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>1</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                        </select>
                </div>

                <div className='my-8 p-1'>
                    <button type="submit" className="w-full px-3 py-1 text-white bg-primary-1 border rounded-sm border-secondary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                        CẬP NHẬT
                    </button>
                </div>
            </form>
        </div>

        {/* Avatar */}
        <div className="pl-10 w-[9rem] h-[9rem]">
            <div className="max-w-full mx-auto mt-2">
                <div className='flex justify-center'>
                    <div className="mb-1 p-1 pr-2">
                        <div className="mt-[4rem]">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-1 hover:text-primary-2 focus-within:outline-none">
                                <img src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-avatar-meo-cute-de-thuong.jpg" 
                                alt="avatar" className="object-scale-down shadow rounded-full max-w-full h-auto align-middle border-none" />
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Information;
