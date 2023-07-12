import { useState, useEffect, useMemo } from 'react';
import { mainApi } from '@/api/main_api';
import * as apiEndpoints from '@/api/api_endpoints';
import { Link, useNavigate } from 'react-router-dom';
import { CardActionArea, Grid } from '@mui/material';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { getallproduct, removeallproduct } from '@/redux/reducers/allProduct_reducers';
import ManySkeleton from './loaders/manySkeleton';
import ProductCard from './ProductItem';
import { RootState } from '@/redux/store/store';
import LoadAllProduct from './LoadAllProduct';

interface Crumb {
  en: string;
  vi: string;
}

interface IAllProduct {
  allProduct: any[];
}

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
  // selectedColor: string;
  // setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  // selectedDimension: string;
  // setSelectedDimension: React.Dispatch<React.SetStateAction<string>>;
}

interface Product {
  id: string;
  discount_id: string;
  category_id: string;
  category_slug: string;
  sub_category_id: string;
  sub_category_slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  create_at: string | number | Date;
  update_at: string | number | Date;
  sold: number;
  color: string[];
}

const ProductList: React.FC<Props> = ({ products, setProducts, filter, setFilter, selectedColor }) => {
  // const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.sub.currentPage);
  const allProducts = useSelector((state: RootState) => state.all.allProduct);
  const currentSearch = useSelector((state: RootState) => state.search.value);
  const [selectedDimension, setSelectedDimension] = useState('');
  const [haveProduct, setHaveProduct] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      setProducts(allProducts.filter((product) => product !== undefined));
  }, [allProducts]);

  const sortedProducts = useMemo(() => {
    let filteredProducts = products;

    if(currentSearch) {
      filteredProducts = products.filter((product) => product.name.toLowerCase().includes(currentSearch.toLowerCase()));
      console.log('filteredProducts', filteredProducts);
    }

    if (!currentPage && !currentSearch) {
      filteredProducts = products;
      setHaveProduct(false);
    } else if (currentPage && !currentSearch) {
      filteredProducts = products.filter((product) => product.category_slug === currentPage.slug);
      if (filteredProducts.length === 0) {
        filteredProducts = products.filter((product) => product.sub_category_slug === currentPage.slug);
      }
      setHaveProduct(true);
    }

    if (filteredProducts.length === 0) {
      setHaveProduct(false);
    }

    if (selectedColor) {
      filteredProducts = filteredProducts.filter((product) => product.color.includes(selectedColor));
      console.log('filteredProducts', filteredProducts);
    }

    if (filter === 'New') {
      return filteredProducts.sort((a, b) => {
        return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
      });
    } else if (filter === 'Sold') {
      return filteredProducts.sort((a, b) => {
        return b.sold - a.sold;
      });
    } else if (filter === 'PriceLow') {
      return filteredProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (filter === 'PriceHigh') {
      return filteredProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else {
      return filteredProducts;
    }
  }, [filter, products, currentPage, currentSearch, selectedColor, allProducts]);

  return (
    <>
      <LoadAllProduct />
        {sortedProducts?.length === 0 && allProducts && 
        selectedColor && currentPage && currentSearch && (
          <div className="text-center text-2xl font-semibold text-red-500">
            Không tìm thấy sản phẩm nào thuộc thể loại này
          </div>
          )
        }
      <div className="mb-3 product-list-container grid grid-cols-1 md:grid-cols-4">
        {allProducts.length === 0 
        ? 
        <ManySkeleton />
        :
          (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )
      }
      </div>
    </>
  );
};

export default ProductList;

  // const getCategorySlug = async (categoryId: string) => {
  //   try {
  //     const result = await mainApi.get(apiEndpoints.GET_CATEGORIES_BY_ID(categoryId));
  //     const data = result.data.data.categorySlug;
  //     return data;
  //   } catch (error: any) {
  //     return error;
  //   }
  // };

  // const getProductImageURLs = async (productId: string) => {
  //   try {
  //     const result = await mainApi.get(apiEndpoints.GET_PRODUCT_IMAGES_URL(productId));
  //     const data = result.data.data;
  //     // console.log('image', data);
  //     return data;
  //   } catch (error: any) {
  //     return error;
  //   }
  // };

  // const getAllProducts = async () => {
  //   try {
  //     const result = await mainApi.get(apiEndpoints.GET_ALL_PRODUCTS);
  //     const data = result.data.data;
  //     const productPromises = data.map(async (item: any) => {
  //       if (item.productStatus === true) {
  //         const categorySlugPromise = getCategorySlug(item.productCategoryId);
  //         const categorySlug = await categorySlugPromise;
  //         const imageUrlsPromise = getProductImageURLs(item._id);
  //         const imageUrls = await imageUrlsPromise;
  //         const imageURLs = imageUrls.map((image: any) => image.imageURL);
  //         return {
  //           id: item._id,
  //           discount_id: item.productDiscountId,
  //           category_id: item.productCategoryId,
  //           category_slug: categorySlug,
  //           name: item.productName,
  //           description: item.productDescription,
  //           price: item.productPrice,
  //           images: imageURLs,
  //           create_at: item.createdAt,
  //           update_at: item.updatedAt,
  //           sold: item.productSold,
  //         };
  //       }
  //     });
  //     const resolvedProducts = await Promise.all(productPromises);
  //     setProducts(resolvedProducts.filter((product) => product !== undefined));
  //     // dispatch(getallproduct(resolvedProducts.filter((product) => product !== undefined)));
  //     const allProducts: IAllProduct = {
  //       allProduct: resolvedProducts.filter((product) => product !== undefined),
  //     };
  //     dispatch(getallproduct(allProducts));
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);