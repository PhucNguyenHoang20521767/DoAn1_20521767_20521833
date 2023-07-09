import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getCustomerWishlist, 
    addOrRemoveProductFromWishlist,
    getProductById,
    getProductImagesUrl
 } from '@/api/api_function';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { notify } from '@/redux/reducers/notify_reducers';
import { changeWishlist } from '@/redux/reducers/wishlist_reducers';

interface Props {
    item: any;
    setWishlist: React.Dispatch<React.SetStateAction<any[]>>;
}

const FavouriteItem = ({item, setWishlist}: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const [product, setProduct] = useState<any>(null);
    const [productImageUrl, setProductImageUrl] = useState<string>('');

    useEffect(() => {
        if (currentUser) {
            getProductById(item.productId).then((res) => {
                setProduct(res.data.data);
            });
            getProductImagesUrl(item.productId).then((res) => {
                setProductImageUrl(res.data.data[0].imageURL);
            });
        }
    }, [item]);

    const handleProductClick = () => {
        navigate(`/collection/${item.productId}`)
    };

    function handleRemoveItemFromCart() {
        const currentProduct = item.productId;
        try {
            if (currentUser) {
                addOrRemoveProductFromWishlist(currentUser, item.productId).then(
                    (res) => {
                        console.log(res);
                        dispatch(changeWishlist());
                        dispatch(notify({isSuccess: true, isError: false, isInfo: false, message: "Xoá sản phẩm khỏi danh sách yêu thích thành công!"}));
                    });
                }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-between'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <button onClick={()=>navigate(`/collection/${item.productId}`)}>
                    <img 
                    src={productImageUrl} 
                    alt={product?.productName} 
                    className='w-16 h-16 object-contain'
                    />
                </button>
                <Typography variant="body1">{product?.productName}</Typography>
            </Box>
            <div className='text-red-700 text-xl flex justify-end gap-4'>
                <div className='h-full flex items-center py-4 px-2'>
                <button key={item.productId} onClick={handleRemoveItemFromCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                </div>
            </div>
        </div>
    );
};

export default FavouriteItem;