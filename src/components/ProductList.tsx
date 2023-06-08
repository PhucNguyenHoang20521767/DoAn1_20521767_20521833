import { useState, useEffect, useMemo } from 'react';
import { mainApi } from '@/api/main_api';
import * as apiEndpoints from '@/api/api_endpoints';
import { Link } from 'react-router-dom';

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

interface Props {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    crumbs?: Crumb;
}

//List of products in product.tsx
const ProductList: React.FC<Props> = ({ products, setProducts, filter, setFilter, crumbs }) => {
  const [category, setCategory] = useState('');
  
  const getCategorySlug = async (categoryId: string) => {
    try {
      const result = await mainApi.get(apiEndpoints.GET_CATEGORIES_BY_ID(categoryId));
      const data = result.data.data.categorySlug;
      // setCategory(data);
      return data;
    } catch (error: any) {
      return error;
    }
  };

  const getAllProducts = async () => {
  try {
    const result = await mainApi.get(apiEndpoints.GET_ALL_PRODUCTS);
    const data = result.data.data;
    const productPromises = data.map(async (item: any) => {
      if (item.productStatus === true){
        const categorySlugPromise = getCategorySlug(item.productCategoryId);
        const categorySlug = await categorySlugPromise;
        return {
          id: item._id,
          category_id: item.productCategoryId,
          category_slug: categorySlug,
          name: item.productName,
          description: item.productDescription,
          price: item.productPrice,
          images: item.productImages,
          create_at: item.createdAt,
          update_at: item.updatedAt,
          sold: item.productSold,
        };
      }
    });
    const resolvedProducts = await Promise.all(productPromises);
    setProducts(resolvedProducts.filter(product => product !== undefined));
    console.log('data', data);
    console.log('products', products);
  } catch (error: any) {
    console.log(error);
  }
};

  useEffect(() => {
    getAllProducts();
    // sortedProducts;
  }, []);

  const sortedProducts = useMemo(() => {
  let filteredProducts = products;

  if (crumbs?.en === 'product'){
    filteredProducts = products;
  }
  else if (crumbs && crumbs.en) {
    filteredProducts = products.filter(product => product.category_slug === crumbs.en);
  }

  console.log('filteredProducts', filteredProducts);

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
}, [filter, products, crumbs]);
  
  return (
    <div>
      {sortedProducts.map((product) => (
        <div key={product.id}>
          <hr />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Link to={`/product/${product.id}`} className='font-bold'>View Product</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;