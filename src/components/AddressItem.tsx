import React, { useState } from 'react'
import { setDefaultAddress, deleteAddress } from '@/api/api_function'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store';
import UpdateAddressModal from './modals/updateAddressModal';

interface IAddress {
  _id: string;
  customerId: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverWard: string;
  receiverDistrict: string;
  receiverCity: string;
  isDefault: boolean;
}

interface IAddressItemProps {
  address: IAddress;
  handleReload: () => void;
}

const AddressItem = ({ address, handleReload }: IAddressItemProps) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const [openUpdate, setOpenUpdate] = useState(false);
  
  async function handleDefault() {
    if (!address.isDefault)
      try{
        await setDefaultAddress(address._id, currentUser)
        handleReload()
      }
      catch (err)
      {
        console.log(err)
      }
  }

  async function handleDelete() {
    if (address.isDefault)
      return
    try{
      await deleteAddress(address._id, currentUser)
      handleReload()
    }
    catch (err)
    {
      console.log(err)
    }
  }

  return (
    <>
      <UpdateAddressModal open={openUpdate} setOpen={setOpenUpdate} address={address} handleReload={handleReload}/>
        <div key={address._id} className='border-2 my-3 w-full h-[10rem]'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <div className='text-primary-1 p-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className='font-bold py-2'>{address.receiverFirstName} {address.receiverLastName}</p>
              </div>
              <div className='flex flex-row'>
                <div className='text-primary-1 p-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className='py-2'>{address.receiverPhone}</p>
              </div>
              <div className='flex flex-row'>
                <div className='text-primary-1 p-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className='py-2 text-gray-500'>{address.receiverAddress}, {address.receiverWard}, {address.receiverDistrict}, {address.receiverCity}</p>
              </div>
            </div>
            <div className='flex flex-col mr-2'>
              <div className='mt-3 p-1'>
                <button 
                onClick={() => {handleDefault()}}
                className={`${address.isDefault ? 'bg-dark-1 text-white' : 'bg-white text-dark-1 hover:text-white'} w-full px-3 rounded-full border hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50`}>
                  {address.isDefault ? "Mặc định" : "Đặt mặc định"}
                </button>
              </div>
              <div className='mt-3 p-1'>
                <button 
                onClick={() => {setOpenUpdate(true)}}
                className="flex flex-row w-full py-1 px-3 rounded-sm text-white bg-primary-1 border border-primary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>

                  Chỉnh sửa
                </button>
              </div>
              <div className='p-1'>
                <button 
                onClick={() => handleDelete()} 
                className="flex flex-row w-full py-1 px-3 rounded-sm text-primary-1 bg-white border border-primary-1 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                  <div className='flex justify-center px-5'>
                    Xóa
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AddressItem