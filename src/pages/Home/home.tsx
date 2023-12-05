import React, { useState, useEffect } from "react";

// import Hero from "@/components/Hero";
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
  return (
    <div>
      {/* <Hero></Hero> */}
      <CampaignCarousel></CampaignCarousel>
      <div className="flex justify-center py-7 text-center text-xl text-black">
        Trải nghiệm những thiết kế sang trọng, chất lượng cao dành cho ngôi nhà
        hiện đại
      </div>
      <Room></Room>
      <Guarantee></Guarantee>
      <div className="flex justify-center py-7 text-center text-xl text-black">
        Sản phẩm giá tốt
      </div>
      <ProductCarousel products={sortedProducts}></ProductCarousel>
      <div className="flex justify-center py-7 text-center text-xl text-black">
        Luôn thấu hiểu khách hàng, cẩn thận và chuyên nghiệp là châm ngôn của
        chúng tôi
      </div>
      <Inspiration></Inspiration>
    </div>
  );
};

export default Home;
