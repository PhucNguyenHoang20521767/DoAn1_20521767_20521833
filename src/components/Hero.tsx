import CampaignCarousel from "@/pages/Home/CampaignCarousel";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const imgadd = [
  "https://housing.com/news/wp-content/uploads/2022/11/living-room-furniture-design-compressed-1.jpg",
  "https://plus.unsplash.com/premium_photo-1661963646937-1566cbb38d34?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mYSUyMHNldHxlbnwwfHwwfHx8MA%3D%3D",
  "https://media.istockphoto.com/id/876931650/photo/grey-sofa-in-living-room.jpg?s=612x612&w=0&k=20&c=NAVqv4jqd2z-I8Z7tRjZTLPylpbOJ5E2qwAjqOWaYZs=",
  "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVybml0dXJlc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://media.istockphoto.com/id/1442837467/photo/interior-design-of-modern-apartment-living-room-with-sofa-and-coffee-tables-3d-rendering.webp?b=1&s=170667a&w=0&k=20&c=m8nt1I_lT8K_crLZ1cTTzb0MCB6oW0mtCBhQ3H_GZu0=",
  "https://media.istockphoto.com/id/876931650/photo/grey-sofa-in-living-room.jpg?s=612x612&w=0&k=20&c=NAVqv4jqd2z-I8Z7tRjZTLPylpbOJ5E2qwAjqOWaYZs=",
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const Hero = () => {
  const [currentImg, setCurrentImg] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      //random image
      // setCurrentImg((currentImg) => {
      //   let newImg = getRandomInt(imgadd.length);
      //   while (currentImg === newImg) {
      //     newImg = getRandomInt(imgadd.length);
      //   }
      //   return newImg;
      // });

      setCurrentImg((currentImg) => (currentImg + 1) % imgadd.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full">
      {imgadd.map((img, index) => (
        <img
          key={index}
          className={`object-hidden absolute left-0 top-0 h-full w-full transition-opacity duration-1000 ${
            index === currentImg ? "opacity-100" : "opacity-0"
          }`}
          src={img}
          alt=""
        />
      ))}
      {/* <img
        className="object-hidden left-0 top-0 h-screen w-full"
        src={imgadd[currentImg]}
        style={{
          transition: "opacity 0.5s ease-in-out",
          opacity: 1,
        }}
        alt="/"
      /> */}
      {/* <CampaignCarousel /> */}
      {/* <div className='bg-black/30 absolute top-0 left-0 w-full h-full' /> */}
      <div className="lg:top-30 absolute top-[4rem] flex h-full w-full flex-col justify-center text-primary-0">
        <div className="m-auto max-w-[1100px] rounded-2xl border border-transparent bg-opacity-90 p-4 backdrop-blur-sm backdrop-filter md:left-[10%]">
          <h3 className="text-5xl font-bold drop-shadow-2xl md:text-5xl">
            Nội thất đơn giản
          </h3>
          <p className="max-w-[600px] py-2 text-3xl font-medium text-black drop-shadow-2xl">
            Cho người tinh tế
          </p>
          <Link to="/product">
            <button className="bg-primary-0 p-3 px-4 text-white hover:bg-dark-1 hover:shadow-lg">
              MUA SẮM NGAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
