import React, { useState, useEffect } from "react";

import Hero from "@/components/Hero";
import Room from "@/components/Room";
import Guarantee from "@/components/Guarantee";
import Inspiration from "@/components/Inspiration";
// import ProductSlideLanding from "@/components/ProductSlideLanding";
import CampaignCarousel from "./CampaignCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const Home = () => {
  const slides = useSelector((state: RootState) => state.all.allProduct);
  const sortedProducts = [...slides].sort(
    (a: any, b: any) => a.price - b.price
  );
  const sortedProducts2 = [...slides].sort((a: any, b: any) => {
    const dateA = new Date(a.create_at);
    const dateB = new Date(b.create_at);
    return dateB.getTime() - dateA.getTime();
  });
  console.log("sortedProducts2", sortedProducts2);
  return (
    <div>
      <Hero></Hero>
      <div className="flex justify-center pb-8 text-center text-xl text-black">
        Trải nghiệm những thiết kế sang trọng, chất lượng cao dành cho ngôi nhà
        hiện đại
      </div>
      <Room></Room>
      <div className="flex justify-center pb-8 text-center text-xl text-black">
        Giảm giá lên đến 50%
      </div>

      <CampaignCarousel></CampaignCarousel>
      <div className="flex justify-center pb-8 text-center text-xl text-black">
        Sản phẩm giá tốt
      </div>
      <ProductCarousel products={sortedProducts}></ProductCarousel>
      <div className="mt-4 flex justify-center py-8 text-center text-xl text-black">
        Sản phẩm mới nhất
      </div>
      <ProductCarousel products={sortedProducts2}></ProductCarousel>
      <Guarantee></Guarantee>
      <div className="flex justify-center py-7 text-center text-xl text-black">
        Luôn thấu hiểu khách hàng, cẩn thận và chuyên nghiệp là châm ngôn của
        chúng tôi
      </div>
      <Inspiration></Inspiration>
    </div>
  );
};

export default Home;
