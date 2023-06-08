import React from 'react'

const Inspiration = () => {
    return (
        <div className='max-w-[1200px] h-[600px] m-auto px-2 pb-12 mb-10 relative'>
            <img
                className='top-0 left-0 w-full h-[600px] object-cover object-top'
                src='https://img.freepik.com/free-photo/beautiful-flowers-table_23-2147755188.jpg?w=996&t=st=1683019970~exp=1683020570~hmac=3a55d97e73e780789b88684feef78447419d4d5c61fd10ff04063951df84b0d0'
                alt='/'
            />
            {/* <div className='bg-black/30 absolute top-0 left-0 w-full h-full' /> */}
            <div className='max-w-[600px] absolute w-full h-full flex flex-col justify-center text-primary-0 top-1 lg:left-[600px] max-sm:left-[120px]'>
                <p className='pb-5 font-bold text-2xl'>GÓC CẢM HỨNG</p>
                <p className='pb-3 text-xl max-w-[500px]'>Bước chân vào thế giới của những mẫu thiết kế mang lại nguồn cảm hứng cho bạn</p>
                <button className='bg-transparent border-secondary-1 border-2 text-secondary-1 p-3 hover:shadow-lg w-[200px]'>KHÁM PHÁ NGAY</button>
            </div>
        </div>
    )
}

export default Inspiration