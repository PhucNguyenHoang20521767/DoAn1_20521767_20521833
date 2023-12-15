import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Skeleton } from "@mui/material";
import { getAllColors } from "@/api/api_function";

import Breadcrumbs from "@/components/Breadcrumbs";
import CampaignCarousel from "../Home/CampaignCarousel";
import ProductList from "@/components/ProductList";
import { set } from "react-hook-form";
import { get } from "http";

export interface Product {
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

interface Crumb {
  en: string;
  vi: string;
}

interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

const product = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.sub.currentPage);
  const currentProduct = useSelector(
    (state: RootState) => state.product.currentProduct
  );
  const currentSearch = useSelector((state: RootState) => state.search.value);
  const [filter, setFilter] = useState("");
  const [room, setRoom] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDimension, setSelectedDimension] = useState("");
  const [colors, setColors] = useState<any[]>([]);

  useEffect(() => {
    getAllColors().then((res) => {
      setColors(res.data.data);
    });
  }, [filter, currentSearch, selectedColor, selectedDimension]);

  const handleColorClick = (color: any) => {
    setSelectedColor(color._id);
    console.log(color._id);
  };

  function handleResetColor() {
    setSelectedColor("");
  }

  function handleRoomChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedRoom = event.target.value;
    setRoom((prev) => {
      prev = selectedRoom;
      return prev;
    });
  }

  return (
    <div className="mx-10">
      <div></div>
      <CampaignCarousel></CampaignCarousel>
      <Breadcrumbs />
      {currentPage ? (
        <div className="flex justify-center py-7 text-center text-xl text-black">
          {currentPage?.name}
        </div>
      ) : (
        <div className="flex justify-center py-7 text-center text-xl text-black">
          {currentProduct ? currentProduct.slugCategorySlug : "Tất cả sản phẩm"}
        </div>
      )}
      <div className="flex flex-wrap">
        {/* product list here */}
        <div className="w-full lg:w-10/12">
          <section className="flex flex-row gap-2">
            <div className="block w-full max-w-max rounded-sm border border-secondary-1 bg-white text-sm text-gray-900 hover:border-2 focus:border-2 focus:border-black focus:ring-white dark:text-white dark:placeholder-white ">
              <div className="flex-column mx-2 flex">
                <div className="flex content-center">
                  <label
                    htmlFor="filter-select"
                    className="p-2 text-lg font-extrabold text-dark-0"
                  >
                    Lọc theo:
                  </label>
                  <select
                    id="filter-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-md block w-full max-w-max border-none bg-white text-gray-900 hover:border-none focus:outline-none focus:ring-0"
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
            {/* <div className="item-center flex w-full max-w-max rounded-sm border border-secondary-1 bg-white text-sm text-gray-900 hover:border-2 focus:border-2 focus:border-black focus:ring-white dark:text-white dark:placeholder-white">
              <div className="mx-2 flex content-center">
                <select
                  id="filter-select"
                  value={room}
                  onChange={handleRoomChange}
                  className="text-md block w-full max-w-max border-none bg-white text-gray-900 hover:border-none focus:outline-none focus:ring-0"
                >
                  
                  <option value="living-room">Phòng khách</option>
                  <option value="bedroom">Phòng ngủ</option>
                  <option value="kitchen">Nhà bếp</option>
                  <option value="outside">Ngoài trời</option>
                </select>
              </div>
            </div> */}
          </section>
          <ProductList
            products={products}
            setProducts={setProducts}
            filter={filter}
            selectedColor={selectedColor}
          />
        </div>
        {/* Filter by color and dimension */}
        <div className="mb-4 w-full max-md:border-t-2 md:border-l-2 lg:w-2/12">
          <div className="flex justify-center">
            <button
              onClick={handleResetColor}
              className="text-md m-1 border border-secondary-1 bg-white p-2 text-lg text-gray-900 hover:border-2 hover:font-bold focus:outline-none focus:ring-0"
            >
              Reset bộ lọc
            </button>
          </div>
          <div className="fotn-bold flex justify-center text-center text-xl text-black">
            Màu
          </div>
          {/* <div className="flex justify-center text-xl text-black text-center">Lọc theo kích thước</div> */}
          <div className="grid grid-cols-3 gap-0">
            {colors.map((color) => (
              <div key={color._id} className="flex items-center justify-center">
                <div
                  className={`m-1 h-8 w-8 cursor-pointer rounded-full ${
                    selectedColor === color._id ? "border-2 border-black" : ""
                  }`}
                  style={{ backgroundColor: color.colorHex }}
                  onClick={() => handleColorClick(color)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default product;
