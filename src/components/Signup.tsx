import React, { useState, useEffect, useRef } from 'react';
import DateTimePick from "./Daypicker"
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import { mainApi } from '@/api/main_api'
import * as apiEndpoints from '@/api/api_endpoints';
import { useDispatch } from 'react-redux'
import { login } from '@/redux/reducers/auth_reducers';

import CircularProgress from '@mui/material/CircularProgress';

enum GenderEnum {
    female = "female",
    male = "male"
}

interface ISignUpInput {
    password: string;
    firstname: string;
    lastname: string;
    birthday: string; 
    email: string;
    gender: GenderEnum;
}

type Props = {
    idToken: string;
    setIdToken: (token: string) => void;
    handleOpen: () => void;
    loginEmail: string;
    setLoginEmail: (email: string) => void;
};

const Signup = ({idToken, setIdToken, handleOpen, loginEmail, setLoginEmail}: Props) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password,  setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //Date time picker
    const [date, setDate] = useState(new Date());

    const { register, formState: { errors }, handleSubmit } = useForm<ISignUpInput>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const firstDivRef = useRef<HTMLDivElement>(null);
    const secondDivRef = useRef<HTMLDivElement>(null);

    const handleChange = (selectedDate: Date) => {
		setDate(selectedDate);
		// console.log("date", selectedDate);
	};

    useEffect(() => {
        if (firstDivRef.current && secondDivRef.current) {
        secondDivRef.current.style.width = firstDivRef.current.offsetWidth + 'px';
        }
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (error) {
          timer = setTimeout(() => {
            setError('');
          }, 10000);
        }
        return () => clearTimeout(timer);
      }, [error]);
    
    // const birthday = date.toISOString().split('T')[0];
    const birthday = date.toLocaleDateString('vi-VN');
    // console.log('birthday', birthday);

    const onSubmit: SubmitHandler<ISignUpInput> = async (data) => {
        if(loading) return;
        // console.log('date', date)
        // console.log('birthday', birthday);
        try {
            setLoading(true);
            const result = await mainApi.post(
                apiEndpoints.SIGNUP,

                apiEndpoints.getSignupBody(data.password, data.firstname, data.lastname, 
                    birthday, data.email,data.gender)
            );

            setLoginEmail(data.email);
            console.log('data', result);
            setIdToken(result.data.customerIdToken);
            handleSignUp();
        } catch (error: any) {
            const message = error.response.data.error;
            if(message === 'customerEmail already exists') {
                setError('Email đã tồn tại');
            } else {
                setError('Đã có lỗi xảy ra');
            }
            setLoading(false);
        }
    }

    const handleSignUp = async () => {
        try {
            handleOpen();
            // navigate('/');
            setLoading(false);
            // localStorage.setItem("currentUser", token);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
    <div className=""> 
        {/* Form */}
        <div className="w-[32rem] max-[512px]:w-full p-2">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-full mx-auto mt-2">
                {/* Basic information */}
                <div className='flex justify-center'>
                    <div className="mb-1 p-1 pr-2">
                        <label htmlFor="text" className="font-semibold text-base text-dark-1">Họ:</label>
                        <input type="text" 
                        {...register("lastname", { pattern: /^[A-Za-z]+$/i })}
                        name="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} 
                        className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                    </div>
                    <div className="mb-1 p-1 pl-2">
                        <label htmlFor="text" className="font-semibold text-base text-dark-1">Tên:</label>
                        <input type="text" 
                        {...register("firstname", { required: true, maxLength: 20 })}
                        name="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} 
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
                            <DateTimePick 
                            selectedDate={date} 
                            setSelectedDate={setDate}
                            handleChange={handleChange}
                            ></DateTimePick>                           
                        </div>
                    </div>
                    {/* Gender */}
                    <div className="mb-1 min-[508px]:pr-[10.4rem]">
                        <label htmlFor="email" className="min-w-10 font-semibold text-base text-dark-1">Giới tính:</label>
                        <select 
                        {...register("gender")}
                        className="bg-white border border-secondary-1 text-gray-900 text-sm focus:ring-white focus:border-black focus:border-2 block w-full p-1.5 dark:bg-dark-1 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {/* <option selected>Giới tính:</option> */}
                            <option value="Nam" >Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div>

                {/* Email */}
                <div className="mb-1 p-1">
                    <label htmlFor="email" className="font-semibold text-base text-dark-1">Email:</label>
                    <input type="email"
                    {...register("email", { required: "Hãy nhập email!"})}
                    name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                </div>

                {/* Password */}
                <div className="mb-1 p-1 relative">
                    <label htmlFor="password" className="font-semibold block text-dark-1">Mật khẩu:</label>
                    <div className="flex items-center">
                        <input type={showPassword ? "text" : "password"} 
                        {...register("password", { required: "Hãy nhập mật khẩu!", minLength: { value: 8, message: "Password ít nhất 8 kí tự"} })}
                        name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" 
                        autoComplete="current-password"
                        required />
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
                {
                    error && <p className='text-red-700'>{error}</p>
                }   

                <div className='mt-3 p-1 pb-4'>
                    <button 
                    type="submit" 
                    className={`w-full px-3 py-1 text-white bg-primary-1 border rounded-sm border-secondary-1 
                    hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                    ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
                    ${loading ? 'opacity-50' : 'opacity-100'}
                    `}>
                        {loading && <CircularProgress size={20} className='mr-2' />}
                        ĐĂNG KÝ
                    </button>
                </div>
                
            </form>
        </div>
    </div>
    )
}

export default Signup;

