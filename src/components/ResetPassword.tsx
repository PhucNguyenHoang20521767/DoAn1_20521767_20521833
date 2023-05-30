import React, {useState, useEffect} from 'react'
import { changePassword } from '@/api/api_function'
// import { mainApi } from '@/api/main_api';
// import * as apiEndpoint from '@/api/api_endpoints';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

import {CircularProgress} from '@mui/material';
import { InputPassword } from '@/components/customs/nhPassword'

const ResetPassword = () => {
    const uid = useSelector((state: RootState) => state.auth.customerIdToken);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [password1, setPassword1] = useState('');
    const [error1, setError1] = useState('');
    const [showPassword2, setShowPassword2] = useState(false);
    const [password2, setPassword2] = useState('');
    const [error2, setError2] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            document.body.style.cursor = 'wait';
            const timer = setTimeout(() => {
                document.body.style.cursor = 'default';
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            document.body.style.cursor = 'default';
        }
    }, [loading])

    useEffect(() => {
        if (password1 !== password2) {
            setError2('Mật khẩu không khớp');
        }
        else if (password1 === password2) {
            setError2('');
        }
    }, [password1, password2])

    useEffect(() => {
        if (password1.length < 8) {
            setError1('Mật khẩu phải có ít nhất 8 ký tự');
        } else {
            setError1('');
        }
    }, [password1])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const res = await changePassword(uid, password, password2)
        if (res.data.success === true) {
            alert('Đổi mật khẩu thành công');
            setPassword('');
            setPassword1('');
            setPassword2('');
        } else {
            alert('Đổi mật khẩu thất bại');
        }
        setLoading(false);
    }

    return (
        <div className='pl-[5rem] border-l-2 mt-10 flex justify-start mb-8'>
            <div className="w-[32rem] max-[512px]:w-full">
                <h1 className='flex justify-end text-2xl font-bold text-gray-700 mb-6'>Đặt lại mật khẩu</h1>
                <InputPassword
                    showPassword = {showPassword} 
                    password = {password} 
                    setPassword = {setPassword} 
                    setShowPassword = {setShowPassword} 
                    label = "Mật khẩu cũ"
                    error = {error}
                />
                <InputPassword
                    showPassword = {showPassword1} 
                    password = {password1} 
                    setPassword = {setPassword1} 
                    setShowPassword = {setShowPassword1} 
                    label = "Mật khẩu mới"
                    error = {error1}
                />
                <InputPassword
                    showPassword = {showPassword2} 
                    password = {password2} 
                    setPassword = {setPassword2} 
                    setShowPassword = {setShowPassword2} 
                    label = "Nhập lại mật khẩu"
                    error = {error2}
                />
                <div className='flex justify-end mt-6'>
                    <div className='mt-3 p-1'>
                        <button className="w-full px-3 py-1 text-white bg-dark-3 border rounded-sm border-secondary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                            HUỶ
                        </button>
                    </div>
                    <div className='mt-3 p-1'>
                        <button type="submit" onClick={handleSubmit} className="w-full px-3 py-1 text-white bg-primary-1 border rounded-sm border-secondary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                            {loading && <CircularProgress size={20} className='mr-2'/>}
                            ĐỔI MẬT KHẨU
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword