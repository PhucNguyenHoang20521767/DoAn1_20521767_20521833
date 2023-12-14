import { useState, useEffect, useMemo } from "react";
import { mainApi } from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardActionArea, Grid } from "@mui/material";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getallproduct,
  removeallproduct,
} from "@/redux/reducers/allProduct_reducers";
import ManySkeleton from "./loaders/manySkeleton";
import ProductCard from "./ProductItem";
import { RootState } from "@/redux/store/store";
import LoadAllProduct from "./LoadAllProduct";
import { Product } from "@/pages/Product/product";

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

// interface Product {
//   id: string;
//   discount_id: string;
//   category_id: string;
//   category_slug: string;
//   sub_category_id: string;
//   sub_category_slug: string;
//   name: string;
//   description: string;
//   price: number;
//   images: string[];
//   create_at: string | number | Date;
//   update_at: string | number | Date;
//   sold: number;
//   color: string[];
// }

const ProductList: React.FC<Props> = ({
  products,
  setProducts,
  filter,
  setFilter,
  selectedColor,
}) => {
  // const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.sub.currentPage);
  const allProducts = useSelector((state: RootState) => state.all.allProduct);
  const currentSearch = useSelector((state: RootState) => state.search.value);
  const { discountId } = useParams<{ discountId: string }>();
  const [selectedDimension, setSelectedDimension] = useState("");
  const [haveProduct, setHaveProduct] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(allProducts.filter((product) => product !== undefined));
  }, [allProducts]);

  const sortedProducts = useMemo(() => {
    let filteredProducts = products;

    if (currentSearch) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(currentSearch.toLowerCase())
      );
      console.log("filteredProducts", filteredProducts);
    }

    if (!currentPage && !currentSearch) {
      filteredProducts = products;
      setHaveProduct(false);
    } else if (currentPage?.slug === "discount") {
      if (discountId) {
        filteredProducts = products.filter(
          (product) => product.discount_id === discountId
        );
      }
      setHaveProduct(true);
    } else if (currentPage && !currentSearch) {
      filteredProducts = products.filter(
        (product) => product.category_slug === currentPage.slug
      );
      // if (filteredProducts.length === 0) {
      //   filteredProducts = products.filter(
      //     (product) => product.sub_category_slug === currentPage.slug
      //   );
      // }
      setHaveProduct(true);
    }

    if (filteredProducts.length === 0) {
      setHaveProduct(false);
    }

    if (selectedColor) {
      filteredProducts = filteredProducts.filter((product) =>
        product.color.includes(selectedColor)
      );
      console.log("filteredProducts", filteredProducts);
    }

    if (filter === "New") {
      return filteredProducts.sort((a, b) => {
        return (
          new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        );
      });
    } else if (filter === "Sold") {
      return filteredProducts.sort((a, b) => {
        return b.sold - a.sold;
      });
    } else if (filter === "PriceLow") {
      return filteredProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (filter === "PriceHigh") {
      return filteredProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else {
      return filteredProducts;
    }
  }, [
    filter,
    products,
    currentPage,
    currentSearch,
    selectedColor,
    allProducts,
    discountId,
  ]);

  return (
    <>
      <LoadAllProduct />
      {sortedProducts?.length === 0 && (
        <div className="text-center text-2xl font-semibold text-red-500">
          Không tìm thấy sản phẩm nào thuộc thể loại này
        </div>
      )}
      <div className="product-list-container mb-3 grid grid-cols-1 md:grid-cols-4">
        {allProducts.length === 0 ? (
          <ManySkeleton />
        ) : (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
