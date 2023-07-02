import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, CardActionArea } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { styleButtonAddCart, styleButtonView } from '@/utils/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { moveToProduct } from '@/redux/reducers/product_reducers';
import IconFavourite from './customs/IconFavourite';
import { getDiscountById } from '@/api/api_function';

interface Product {
  id: string;
  discount_id: string;
  category_id: string;
  category_slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  create_at: string | number | Date;
  update_at: string | number | Date;
  sold: number;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [changeFavorite, setChangeFavorite] = useState(false);
    const navigate = useNavigate();
    const [discountPrice, setDiscountPrice] = useState<number>(product.price);
    const [isDiscount, setIsDiscount] = useState<boolean>(true);

  function handleFavourite(): void {}

  const handleOnClickView = () => {
    dispatch(moveToProduct({ currentProduct: product.id }));
    navigate(`/collection/${product.id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDiscountById(product.discount_id);
        if (res.data.data) {
          const discount = res.data.data;
          // console.log(discount);
          const newPrice = product.price - (product.price * discount.discountPercent) / 100;
          setDiscountPrice(newPrice);
          if (product.discount_id && new Date(discount.discountEndDate) > new Date())
          setIsDiscount(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // console.log("pd", product);
    if (product.discount_id)
    fetchData();

  }, [product]);

  return (
    <Card
      key={product.id}
      className="group"
      sx={{
        maxWidth: 345,
        marginRight: 1,
        marginTop: 1,
        position: 'relative',
      }}
    >
      <div className="flex justify-end">
        <IconFavourite/>
      </div>
      <CardActionArea
        className="group z-10"
        sx={{ height: 188 }}
        onClick={() => navigate(`/collection/${product.id}`)}
      >
        <CardMedia style={{ height: 140 }}>
          <LazyLoadImage
            className="h-full w-full object-cover"
            alt={product.name}
            height={140}
            src={product.images[0]}
            width={280}
            onError={(e: any) => {
              e.currentTarget.src =
                'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
            }}
            style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{ fontFamily: 'EB Garamond' }}>
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <div className={product.discount_id ? 'flex justify-between' : ''}>
          <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'EB Garamond'}}>
            {/* <div> */}
              {product.discount_id ? discountPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}
            {/* </div> */}
          </Typography>
          <Typography className={product.discount_id ? `line-through` : ''} variant="body2" color="text.secondary" style={{ fontFamily: 'EB Garamond'}}>
            {/* <div> */}
              {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            {/* </div> */}
          </Typography>
        </div>
      </CardContent>
      <div
        className="z-20 flex justify-between invisible bg-white product-card-buttons group-hover:visible"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px' }}
      >
        <Button
          className="hover:text-white"
          variant="outlined"
          style={{ marginLeft: '2px', paddingRight: '28px', paddingLeft: '28px', color: '#A67F78' }}
          sx={styleButtonView}
          onClick={() => handleOnClickView()}
        >
          Xem thêm
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '2px' }}
          sx={styleButtonAddCart}
          onClick={() => {
            navigate('/cart');
          }}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;