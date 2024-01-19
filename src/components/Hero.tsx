import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

// const imgAdd = [
//   "https://housing.com/news/wp-content/uploads/2022/11/living-room-furniture-design-compressed-1.jpg",
//   "https://plus.unsplash.com/premium_photo-1661963646937-1566cbb38d34?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mYSUyMHNldHxlbnwwfHwwfHx8MA%3D%3D",
//   "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVybml0dXJlc3xlbnwwfHwwfHx8MA%3D%3D",
//   "https://media.designcafe.com/wp-content/uploads/2022/03/10093403/cat-furniture-ideas-for-your-home.jpg",
//   "https://cutewallpaper.org/25/anime-home-wallpaper-hd/985618888.jpg",
// ];

const imgAdd = [
  "./hero1.webp",
  "./hero2.webp",
  "./hero3.webp",
  "./hero4.webp",
  "./hero5.webp",
];

const Hero = () => {
  const [currentImg, setCurrentImg] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((currentImg) => (currentImg + 1) % imgAdd.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="box-border h-[600px] w-full overflow-hidden">
      {/* {imgAdd.map((img, index) => (
        <img
          key={index}
          className={`h-auto w-full transform transition-transform duration-500 ease-in-out ${
            currentImg === index
              ? "translate-x-0"
              : currentImg > index
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
          src={img}
          alt="hero"
        />
      ))} */}
      {imgAdd.map((img, index) => (
        <LazyLoadImage
          key={index}
          className={`top-30 absolute mx-40 box-border h-full max-h-[400px] w-3/4 ${
            index === currentImg ? "opacity-100" : "opacity-0"
          }`}
          // className={`top-30 absolute left-0 box-border h-full max-h-[400px] w-max overflow-hidden object-cover object-center transition-opacity duration-1000 md:max-h-full md:w-full md:object-contain md:object-top ${
          //   index === currentImg ? "opacity-100" : "opacity-0"
          // }`}
          alt="hero"
          height={128}
          src={img}
          width={44}
          onError={(e: any) => {
            e.currentTarget.src =
              "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
          }}
          style={{ transition: "transform 0.3s ease" }}
          onMouseEnter={(e: any) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      ))}
      {/* <CampaignCarousel /> */}
      <div className="lg:top-30 absolute top-[4rem] flex h-full w-full flex-col justify-center text-primary-0">
        <div className="m-auto max-w-[1100px] rounded-2xl border border-transparent bg-opacity-90 p-4 backdrop-blur-sm backdrop-filter md:left-[10%]">
          <h3 className="text-5xl font-bold drop-shadow-2xl md:text-5xl">
            Nội thất đơn giản
          </h3>
          <p className="max-w-[600px] py-2 text-3xl font-medium text-black drop-shadow-2xl">
            Cho người tinh tế
          </p>
          <Link to="/product">
            <button className="bg-primary-0 p-3 px-4 text-white hover:bg-black hover:shadow-lg">
              MUA SẮM NGAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
