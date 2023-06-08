import { useState, useEffect, useMemo } from 'react';
import { mainApi } from '@/api/main_api';
import * as apiEndpoints from '@/api/api_endpoints';
import { Link } from 'react-router-dom';

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

interface Props {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ProductList: React.FC<Props> = ({ products, setProducts, filter, setFilter }) => {

  const getAllProducts = async () => {
    try {
      const result = await mainApi.get(apiEndpoints.GET_ALL_PRODUCTS);
      const data = result.data.data;
      setProducts(
        data.map((item: any) => {
          if (item.productStatus === true)
              return {
              id: item._id,
              name: item.productName,
              description: item.productDescription,
              price: item.productPrice,
              images: item.productImages,
              create_at: item.createdAt,
              update_at: item.updatedAt,
              sold: item.productSold,
              };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    // sortedProducts;
  }, []);

  const sortedProducts = useMemo(() => {
    if (filter === 'New') {
      return [...products].sort((a, b) => {
        return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
      });
    } else if (filter === 'Sold') {
      return [...products].sort((a, b) => {
        return b.sold - a.sold;
      });
    } else if (filter === 'PriceLow') {
      return [...products].sort((a, b) => {
        return a.price - b.price;
      });
    } else if (filter === 'PriceHigh') {
      return [...products].sort((a, b) => {
        return b.price - a.price;
      });
    } else {
      return products;
    }
  }, [filter, products]);
  
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