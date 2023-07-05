import React, { useState } from 'react'
import AddressItem from './AddressItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AddressModal from './modals/addressModal'
import { set } from 'react-hook-form'

const Address = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state: RootState) => state.auth.currentUser)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const handleAddADdress = () => {
        if (!currentUser)
            navigate('signin')
        setOpen(true)
    }

    return (
        <>
        <AddressModal open={open} setOpen={setOpen} />
        <div className="pl-[5rem] border-l-2 mt-10 flex justify-start"> 
            <div className="w-[48rem] max-[512px]:w-full">
            <h1 className='flex justify-center text-2xl font-bold text-gray-700'>Danh sách địa chỉ</h1>
            <button 
                onClick={() => handleAddADdress()}
                className={`px-3 py-1 text-white bg-secondary-1 border rounded-sm border-secondary-1
                hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                `}>
                    Thêm địa chỉ
            </button>
            {/* Form */}    
                <AddressItem />
            </div>
        </div>
        </>
    )
}

export default Address