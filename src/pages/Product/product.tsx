import React, {useState, useEffect} from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Skeleton } from '@mui/material'

import Breadcrumbs from '@/components/Breadcrumbs'
import ImageSlider from '@/components/ImageSlider'
import ProductList from '@/components/ProductList'
import { set } from 'react-hook-form'

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

interface Crumb {
  en: string;
  vi: string;
}

const product = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('')
  const [products, setProducts] = useState<Product[]>([]);
  const [crumbs, setCrumbs] = useState<Crumb>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');
  const [currentPage, setCurrentPage] = useState('Tất cả sản phẩm' as string);

  const onCurrentPageChange = (crumb: Crumb) => {
    // get crumb from Breadcrumbs.tsx
    setCrumbs(crumb);
  }
    
  useEffect(() => {
    setCurrentPage(crumbs?.vi.toString() || 'Tất cả sản phẩm')
    if (crumbs?.en === 'product') {
      setCurrentPage('Tất cả sản phẩm')
    }
  }, [crumbs])

  return (
    <div className='mx-10'>
      <div></div>
      <ImageSlider></ImageSlider>
      <Breadcrumbs onCurrentPageChange={onCurrentPageChange}/>
      <div className="py-7 flex justify-center text-xl text-black text-center">{currentPage}</div>
        <div className='flex flex-wrap'>
          {/* product list here */}
          <div className='w-full lg:w-10/12'>
            <div className="max-w-max bg-white border border-secondary-1 hover:border-2 text-gray-900 text-sm rounded-sm focus:ring-white focus:border-black focus:border-2 block w-full dark:bg-dark-1 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <div className="mb-1 flex flex-column">
                <div className='flex content-center'>
                  <label htmlFor='filter-select' className="p-2 ml-2 text-lg text-dark-0 font-extrabold">Lọc theo:</label>
                  <select 
                    id='filter-select'
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
            </div>
            <ProductList 
            products={products} 
            setProducts={setProducts} 
            filter={filter}
            setFilter={setFilter}
            crumbs={crumbs}
            // selectedColor={selectedColor}
            // selectedDimension={selectedDimension}
            />
          </div>
          {/* Filter by color and dimension */}
          <div className='w-full lg:w-2/12 max-md:border-t-2 md:border-l-2 mb-4'>
            <div className='flex justify-center'>
              <button className='border text-lg p-2 m-1 bg-white text-md text-gray-900 hover:font-bold border-secondary-1 hover:border-2 focus:outline-none focus:ring-0'>Reset bộ lọc</button>
            </div>
            <div className="flex justify-center text-xl fotn-bold text-black text-center">Màu</div>
            {/* <div className="flex justify-center text-xl text-black text-center">Lọc theo kích thước</div> */}
          </div>
        </div>
    </div>
  )
}

export default product