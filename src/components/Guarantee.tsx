import React from 'react'

const Guarantee = () => {
    return (
        <div className='w-center bg-secondary-5'>
            <div className='max-w-[1200px] m-auto px-4 py-12 flex flex-wrap justify-between bg-secondary-5'>
                <div className='flex flex-wrap justify-between'>
                    <img 
                    className='w-[60px] h-[60px]'
                    src="https://icon-library.com/images/delivery-truck-icon-png/delivery-truck-icon-png-18.jpg" 
                    alt="" />
                    <div className='pl-4'>
                        <p className='text-lg font-bold text-black/80'>Giao hàng miễn phí</p>
                        <p className='text-md text-black/60'>Trong nước và quốc tể</p>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between mt-1'>
                    <img 
                    className='w-auto h-[56px]'
                    // src="https://cdn-icons-png.flaticon.com/512/6582/6582140.png" 
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_WOfvpIn1YQxm9NICpihz-n9BBT1ktn5Iw&usqp=CAU'
                    alt="" />
                    <div className='pl-4'>
                        <p className='text-lg font-bold text-black/80'>Hỗ trợ 24/7</p>
                        <p className='text-md text-black/60'>Hết lòng phục vụ</p>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between'>
                    <img 
                    className='w-[60px] h-[60px]'
                    src="https://www.iconpacks.net/icons/2/free-guarantee-icon-3598-thumb.png" 
                    alt="" />
                    <div className='pl-4'>
                        <p className='text-lg font-bold text-black/80'>Bảo hành 2 năm</p>
                        <p className='text-md text-black/60'>Đối với tất cả sản phẩm</p>
                    </div>
                </div>
            </div> 
        </div>

    )
}

export default Guarantee