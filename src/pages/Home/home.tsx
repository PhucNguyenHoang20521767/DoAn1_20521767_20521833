import React, { useState, useEffect } from "react";

import Hero from "@/components/Hero";
import Room from "@/components/Room";
import Guarantee from "@/components/Guarantee";
import Inspiration from "@/components/Inspiration";
import ImageSlider from "@/components/ImageSlider";
import ProductSlideLanding from "@/components/ProductSlideLanding";

const Home = () => {
  return (
    <div>
      <div></div>
      <Hero></Hero>
      <div className="flex justify-center py-7 text-center text-xl text-black">
        Trải nghiệm những thiết kế sang trọng, chất lượng cao dành cho ngôi nhà
        hiện đại
      </div>
      <Room></Room>
      <Guarantee></Guarantee>
      <div className="flex justify-center py-7 text-center text-xl text-black">
        Sản phẩm giá tốt
      </div>
      <ProductSlideLanding></ProductSlideLanding>
      <div className="flex justify-center py-7 text-center text-xl text-black">
        Luôn thấu hiểu khách hàng, cẩn thận và chuyên nghiệp là châm ngôn của
        chúng tôi
      </div>
      <Inspiration></Inspiration>
    </div>
  );
};

export default Home;
