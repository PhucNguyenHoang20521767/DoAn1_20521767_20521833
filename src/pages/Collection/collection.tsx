import React, { useState, useEffect } from 'react'
import ScrollToTop from '@/utils/scroll_top'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { getProductById, getProductColor, getProductColorById } from '@/api/api_function'

import Breadcrumbs from '@/components/BreadcrumbsProduct'
import { IconButton } from '@mui/material'
import IconFavourite from '@/components/customs/IconFavourite'
import ProductImages from '@/components/ProductImage'

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
        console.log('productColor', productColor)

        const listColor = await Promise.all(productColor.map(async (color: any) => {
          const listColorRes = await getProductColorById(color._id)
          const listColor = listColorRes.data.color
          console.log('listColor1', listColor)
          return { ...color, ...listColor, colorId: color._id }
        }))
        console.log('listColor2', listColor)
        setListColor(listColor)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    if (chooseColor) {
      console.log('chooseColor', chooseColor)
    }
  }, [chooseColor])

  const handleColorClick = (color: Color) => {
    console.log('color', color)
    setChooseColor(color)
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ScrollToTop />
      {/* top */}
      <div className='flex justify-between'>
        <Breadcrumbs />
        <div className='p-2 mr-2 flex justify-center'>
            <p className='flex items-center text-lg text-black'>Yêu thích</p>
            <IconFavourite/>
        </div>
      </div>
      {/* mid */}
      {product && (
        <>
          <h1>{product.productName}</h1>
          <p>{product.productDescription}</p>
          <p>{product.productPrice}</p>
        </>
      )}

      {listColor && (
        <div className="flex flex-wrap">
          {listColor.map((color: Color) => (
            <div key={color._id} className="w-1/2 p-2">
              <div>
                {color.colorName}
              </div>
              <div
                className="w-8 h-8 rounded-full cursor-pointer"
                style={{ backgroundColor: color.colorHex }}
                onClick={() => handleColorClick(color)}
              />
            </div>
          ))}
        </div>
      )}

      {chooseColor && (
        <ProductImages 
        productId={id ? id : "nan"} 
        colorId={chooseColor.colorId ?? listColor[0].colorId} 
        />
      )}

      {currentUser && (
        <button>
          Add to cart
        </button>
      )}
      {!currentUser && (
        <Link to="/login">Sign in to add to cart</Link>
      )}
    </>
  )
}

export default Collection