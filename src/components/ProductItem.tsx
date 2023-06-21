import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, CardActionArea } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { styleButtonAddCart, styleButtonView } from '@/utils/ui';

interface Product {
  id: string;
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
  const [changeFavorite, setChangeFavorite] = useState(false);
  const navigate = useNavigate();

  function handleFavourite(): void {}

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
        <IconButton onClick={() => handleFavourite()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:text-secondary-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#000000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </IconButton>
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
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{ fontFamily: 'EB Garamond' }}>
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'EB Garamond' }}>
          {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </Typography>
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
          onClick={() => navigate(`/collection/${product.id}`)}
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