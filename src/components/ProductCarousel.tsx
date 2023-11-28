import exp from "constants";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import ProductCard from "./ProductItem";

function NextArrow(props: any) {
  console.log(props);
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <IoIosArrowDroprightCircle
        style={{
          ...style,
          fontSize: "30px",
          display: "block",
          color: "black",
          borderRadius: "50%",
          position: "relative",
          right: "10px",
          zIndex: "5",
        }}
      />
    </div>
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <IoIosArrowDropleftCircle
        style={{
          ...style,
          fontSize: "30px",
          display: "block",
          color: "black",
          borderRadius: "50%",
          position: "relative",
          right: "2px",
          zIndex: "5",
        }}
      />
    </div>
  );
}

export function ProductCarousel({ products }: { products: any }) {
  console.log("products", products);
  var settings = {
    dots: true,
    infinite: products.length > 5 ? true : false,
    speed: 500,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (products.length === 0) return;
    else if (products.length < 5) {
      settings.infinite = false;
      settings.slidesToShow = products.length;
      settings.slidesToScroll = products.length;
    }
  }, [products]);

  return (
    <section className="relative mx-2 md:mx-8">
      <Slider {...settings}>
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Slider>
    </section>
  );
}

export default ProductCarousel;
