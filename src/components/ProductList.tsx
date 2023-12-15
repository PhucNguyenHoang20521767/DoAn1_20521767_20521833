import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import LoadAllProduct from "./LoadAllProduct";
import ProductCard from "./ProductItem";
import { Product } from "@/pages/Product/product";
import ManySkeleton from "./loaders/manySkeleton";

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  filter: string;
  selectedColor: string;
}

const ProductList: React.FC<Props> = ({
  products,
  setProducts,
  filter,
  selectedColor,
}) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.sub.currentPage);
  const allProducts = useSelector((state: RootState) => state.all.allProduct);
  const currentSearch = useSelector((state: RootState) => state.search.value);
  const { discountId } = useParams<{ discountId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(allProducts.filter((product) => product !== undefined));
  }, [allProducts]);

  const filterBySearch = (products: Product[], search: string) => {
    if (!search) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filterByPage = (products: Product[], page: any, discountId: string) => {
    if (!page) return products;
    if (page.slug === "discount" && discountId) {
      return products.filter(
        (product: Product) => product.discount_id === discountId
      );
    }
    return products.filter(
      (product: Product) =>
        product.category_slug === page.slug ||
        product.sub_category_slug === page.slug
    );
  };

  const filterByColor = (products: Product[], color: string) => {
    if (!color) return products;
    return products.filter((product: Product) => product.color.includes(color));
  };

  const sortedProducts = useMemo(() => {
    let filteredProducts = filterBySearch(products, currentSearch);

    if (currentPage?.slug === "discount") {
      filteredProducts = filterByPage(
        filteredProducts,
        currentPage,
        discountId || ""
      );
    }

    if (selectedColor) {
      filteredProducts = filterByColor(filteredProducts, selectedColor);
    }

    switch (filter) {
      case "New":
        return filteredProducts.sort(
          (a, b) =>
            new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        );
      case "Sold":
        return filteredProducts.sort((a, b) => b.sold - a.sold);
      case "PriceLow":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "PriceHigh":
        return filteredProducts.sort((a, b) => b.price - a.price);
      default:
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
