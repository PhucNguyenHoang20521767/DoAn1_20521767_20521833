import React from 'react'
import { Link } from 'react-router-dom'

const Room = () => {
    return (
        <div className='max-w-[700px] m-auto px-2 pb-12 flex item-center sm:flex-wrap sm:justify-between'>
            <Link to={'product/living-room'}>
                <div className='text-center'>
                    <img 
                    className='w-[150px] h-[200px] object-cover shadow-lg'
                    src="https://media.designcafe.com/wp-content/uploads/2019/12/17055334/minimalistic-living-room-interior.jpg" 
                    alt="" 
                    />
                    <p className='text-lg font-bold text-dark-1'>Phòng khách</p>
                </div>
            </Link>
            <Link to={'product/kitchen'}>
                <div className='text-center'>
                    <img 
                    className='w-[150px] h-[200px] object-cover shadow-lg'
                    src="https://www.thespruce.com/thmb/TiVwyfd-o6P-s2iKlu9KjgmDOvA=/2048x0/filters:no_upscale():max_bytes(150000):strip_icc()/exciting-small-kitchen-ideas-1821197-hero-d00f516e2fbb4dcabb076ee9685e877a.jpg" 
                    alt="" 
                    />
                    <p className='text-lg font-bold text-dark-1'>Nhà bếp</p>
                </div>
            </Link>
            <Link to={'product/bedroom'}>
                <div className='text-center'>
                    <img 
                    className='w-[150px] h-[200px] object-cover shadow-lg'
                    src="https://hips.hearstapps.com/hmg-prod/images/ghk010121homefeature-008-1671137680.png?resize=1200:*" 
                    alt="" 
                    />
                    <p className='text-lg font-bold text-dark-1'>Phòng ngủ</p>
                </div>
            </Link>
        </div>
    )
}

export default Room