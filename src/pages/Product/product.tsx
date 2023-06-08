import React, {useState, useEffect} from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Breadcrumbs from '@/components/Breadcrumbs'
import ImageSlider from '@/components/ImageSlider'
import ProductList from '@/components/ProductList'
import { set } from 'react-hook-form'

interface Product {
  create_at: string | number | Date;
  update_at: string | number | Date;
  sold: number;
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

interface Crumb {
  en: string;
  vi: string;
}

const product = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('')
  const [products, setProducts] = useState<Product[]>([]);
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);

  const onCurrentPageChange = (crumb: Crumb) => {
    setCrumbs([...crumbs, crumb])
  }
    

  // useEffect(() => {
  //   // dispatch({type: 'SET_CURRENT_PAGE', payload: 'product'})
  //   console.log(crumbs)
  // }, [])

  return (
    <div className='mx-10'>
      <div></div>
      <ImageSlider></ImageSlider>
      <Breadcrumbs onCurrentPageChange={onCurrentPageChange}/>
      <div className="py-7 flex justify-center text-xl text-black text-center">Tất cả sản phẩm</div>
      {/* product list here */}
      <div className="max-w-max bg-white border border-secondary-1 text-gray-900 text-sm rounded-sm focus:ring-white focus:border-black focus:border-2 block w-full dark:bg-dark-1 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <div className="mb-1 flex flex-column">
          <p className='flex content-center'>
            <span className="p-2 ml-2 text-lg text-dark-0 font-extrabold">Lọc theo:</span>
          </p>
            <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-max bg-white text-md text-gray-900 block w-full border-none hover:border-none focus:outline-none focus:ring-0"
            >
                {/* <option selected>Giới tính:</option> */}
                <option value="New">Mới nhất</option>
                <option value="Sold">Bán chạy nhất</option>
                <option value="PriceLow">Giá: thấp - cao</option>
                <option value="PriceHigh">Giá: cao - thấp</option>
            </select>
        </div>
      </div>
      <ProductList 
      products={products} 
      setProducts={setProducts} 
      filter={filter}
      setFilter={setFilter}
      />
    </div>
  )
}

export default product

export const productLoader = () => {
    return import(/* webpackChunkName: "product" */ './product')
}