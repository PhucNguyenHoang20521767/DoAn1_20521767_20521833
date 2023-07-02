import React, { useState, useEffect } from 'react'
import ScrollToTop from '@/utils/scroll_top'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { 
  getProductById, 
  getProductColor, 
  getProductColorById, 
  getProductDimensionById,
  getProductRating,
  getDiscountById
} from '@/api/api_function'
import { Card, CardContent, CardMedia, Typography, Rating, Button, IconButton, CardActionArea } from '@mui/material';
import { styleButtonAddCart, styleButtonView } from '@/utils/ui';
import Breadcrumbs from '@/components/BreadcrumbsProduct'
import IconFavourite from '@/components/customs/IconFavourite'
import ProductImages from '@/components/ProductImage'
import NumberInput from '@/components/customs/NumberInput'
import { set } from 'react-hook-form'

interface Props {
  product: any;
}

interface Color {
  _id: string;
  colorName: string;
  colorHex: string;
  productId: string;
  colorId: string;
  productQuantity: number;
}

const Collection: React.FC = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [listColor, setListColor] = useState<Color[]>([])
  const [chooseColor, setChooseColor] = useState<Color | null>(null)
  const [dimension, setDimension] = useState<any>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [rating, setRating] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  let discountNotExpired = true;

  useEffect(() => {
    async function fetchData() {
      if (id === undefined) {
        return <div className='p-5 text-xl'>Không tìm thấy sản phẩm!</div>
      }
      try {
        const productRes = await getProductById(id)
        const product = productRes.data.data
        console.log('product', product)
        setProduct(product)

        const productColorRes = await getProductColor(id)
        const productColor = productColorRes.data.data
        // console.log('productColor', productColor)

        const productDimensionRes = await getProductDimensionById(id)
        const productDimension = productDimensionRes.data.data
        // console.log('productDimension', productDimension)
        setDimension(productDimension)

        const productRatingRes = await getProductRating(id)
        const productRating = productRatingRes.data
        setRating(productRating.averageRating)
        // console.log('productRating', rating)

        if(product.productDiscountId) {
          const productDiscountRes = await getDiscountById(product.productDiscountId)
          const productDiscount = productDiscountRes.data.data
          // console.log('productDiscount', productDiscount)
          if (productDiscount && new Date(productDiscount.discountEndDate) > new Date()) {
            setDiscount(productDiscount.discountPercent)
          }
          else {
            discountNotExpired = false;
          }
        }

        const listColor = await Promise.all(productColor.map(async (color: any) => {
          const listColorRes = await getProductColorById(color._id)
          const listColor = listColorRes.data.color
          // console.log('listColor1', listColor)
          return { ...color, ...listColor, colorId: color._id }
        }))
        // console.log('listColor2', listColor)
        if (listColor.length > 0) {
          setListColor(listColor)
          setChooseColor(listColor[0])
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (discountNotExpired && product) {
      const newPrice = (product.productPrice * (100 - discount)) / 100
      setPrice(newPrice)
    }
  }, [discount])

  const handleColorClick = (color: Color) => {
    setChooseColor(color)
  }

  if (!product) {
    return (
    <div>
      <Breadcrumbs />
      <div className='p-6'>
        Chúng tôi không thể truy cập sản phẩm. Bạn có thể xem các sản phẩm khác tại: <Link className='text-dark-0 font-bold' to={"/product"}>Quay lại trang sản phẩm</Link>
      </div>
    </div>
    )
  }

  function handleAddToCart(): void {
    throw new Error('Function not implemented.')
  }

  function handleCheckout() {
    throw new Error('Function not implemented.')
  }

  return (
    <div className='mx-4 md:mx-12 pr-2'>
      <ScrollToTop />
      {/* product Currently unavailable */}
      {!product.productStatus && (
        <div className='p-2 mt-2 flex justify-center text-xl font-bold text-red-700'>
          Sản phẩm này hiện không có sẵn
        </div>
      )}
      {/* top */}
      <div className='flex justify-between'>
        <Breadcrumbs />
        <div className='py-2 flex justify-center'>
            <p className='flex items-center text-lg text-black'>Yêu thích</p>
            <IconFavourite/>
        </div>
      </div>
      
      <div className="md:flex md:flex-wrap">
        {/* mid left */}
        <div className='md:w-2/3'>
          {chooseColor && (
            <ProductImages 
            productId={id ? id : "nan"} 
            colorId={chooseColor.colorId ?? listColor[0].colorId} 
            />
          )}
        </div>

        {/* mid right */}
        <div className='md:w-1/3'>
          {/* product name */}
          {product.productStatus && (
            <div className='md:flex md:justify-start'>
              <div>
                {/* name */}
                <h1 className='text-2xl font-bold'>{product.productName}</h1>
                <div className='flex justify-normal'>
                  {
                    rating && (
                      <Rating name="read-only" precision={0.5} value={rating} readOnly />
                    )
                  }
                  <p className='text-md ml-2 text-gray-600'>Đã bán: </p>
                  <p className='text-md ml-1 text-gray-600'>{product.productSold}</p>
                </div>
                {/* price */}
                <div className='flex justify-start items-center py-1'>
                  {
                    discountNotExpired && (
                    <p className='text-xl text-dark-1 mr-3 line-through'>
                      {product.productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>  
                    ) 
                  }
                  <p className='text-2xl text-black mr-3'>
                    {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </p>
                  {
                    discountNotExpired && (
                    <div className="bg-red-500 text-white font-bold rounded-md px-2 flex items-center">
                      <span className="text-2xl mr-2">{discount}%</span>
                      <span className='text-xl'>Giảm</span>
                    </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}
          {/* color */}
          <>
            <div className='flex items-center'>
              <p className='font-bold text-lg mr-1'>Màu: </p> 
              <p>{chooseColor?.colorName}</p>
            </div>
            {listColor && (
            <div className="flex justify-start">
              {listColor.map((color: Color) => (
                <div key={color._id} className="p-2">
                  <div
                    className={`w-8 h-8 rounded-full cursor-pointer ${
                      chooseColor?.colorId === color.colorId ? 'border-1 border-black' : ''
                    }`}
                    style={{
                      backgroundColor: color.colorHex,
                      boxShadow:
                        chooseColor?.colorId === color.colorId
                          ? 'inset 0 0 0 2px white, 0 0 0 0.5px black'
                          : '',
                    }}
                    onClick={() => handleColorClick(color)}
                  />
                </div>
              ))}
            </div>
            )}
          </>
              <div className=''>
                {/* quantity */}
                <div className='flex justify-start'>
                  <p className='font-bold text-lg'>Số lượng: </p>
                  <p className='text-lg ml-1'>{product.productQuantity}</p>
                </div>
                {/*
                <div className='flex justify-start'>
                  <p className='font-bold text-lg'>Đã bán: </p>
                  <p className='text-lg ml-1'>{product.productSold}</p>
                </div> */}
              </div>
              <div>

                {/* weight */}
                {/* dimension */}
                {
                  dimension && (
                    <div className='flex justify-start'>
                      <p className='font-bold text-lg'>Kích thước: </p>
                      <p className='text-lg ml-1'>Dài: {dimension[0]?.productLength}m,</p>
                      <p className='text-lg ml-1'>Rộng: {dimension[0]?.productWidth}m,</p>
                      <p className='text-lg ml-1'>Cao: {dimension[0]?.productHeight}m</p>
                    </div>
                  )
                }
                {
                  dimension && (
                    <div className='flex justify-start'>
                      <p className='font-bold text-lg'>Cân nặng: </p>
                      <p className='text-lg ml-1'>{dimension[0]?.productWeight}kg</p>
                    </div>
                  )
                }
              </div>
          {/* buy */}
          <div className='flex justify-center my-2'>
            <NumberInput value={quantity} onChange={setQuantity} />
          </div>
            <div className='flex justify-center'>
            <Button
              variant="contained"
              color="primary"
              style={{  paddingRight: '50px', paddingLeft: '50px', marginRight: '2px' }}
              sx={styleButtonAddCart}
              onClick={() => {
                handleCheckout()
              }}
            >
              Mua ngay
            </Button>
            <Button
              className="hover:text-white"
              variant="outlined"
              style={{ marginLeft: '4px', color: '#A67F78', padding: '10px' }}
              sx={styleButtonView}
              onClick={() => handleAddToCart()}
            >
              Thêm vào giỏ hàng
            </Button>
            </div>
        </div>
      </div>

      {/* Look like */}
      <div className='mt-4'>
        <div className="py-7 flex justify-center text-xl text-black text-center">Sản phẩm tương tự</div>
      </div>
    </div>
  )
}

export default Collection