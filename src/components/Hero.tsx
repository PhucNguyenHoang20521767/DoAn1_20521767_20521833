import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='w-full h-screen'>
            <img
                className='top-0 left-0 w-full h-screen object-cover'
                src='https://housing.com/news/wp-content/uploads/2022/11/living-room-furniture-design-compressed-1.jpg'
                alt='/'
            />
            {/* <div className='bg-black/30 absolute top-0 left-0 w-full h-full' /> */}
            <div className='top-[8rem] absolute lg:top-40 w-full h-full flex flex-col justify-center text-primary-0'>
                <div className='md:left-[10%] max-w-[1100px] m-auto p-4'>
                <h3 className='font-bold text-5xl md:text-5xl drop-shadow-2xl'>
                    Nội thất đơn giản
                </h3>
                <p className='max-w-[600px] drop-shadow-2xl py-2 text-3xl'>
                    Cho người tinh tế
                </p>
                <Link to='product'>
                    <button className='bg-secondary-1 text-white p-3 hover:shadow-lg'>
                        MUA SẮM NGAY
                    </button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero