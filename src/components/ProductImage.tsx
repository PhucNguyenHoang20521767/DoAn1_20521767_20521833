import { useEffect, useState } from "react";
import { getAllProductImageUrlByColor } from "@/api/api_function";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import Skeleton from "@mui/material/Skeleton";
import ProductSkeleton from "@/components/loaders/productSkeleton";

interface Props {
  productId: string;
  colorId: string;
}

const ProductImages: React.FC<Props> = ({ productId, colorId }) => {
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [subImages, setSubImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllProductImageUrlByColor(productId, colorId);
        const images = res.data.data.map((image: any) => image.imageURL);
        setMainImage(images[0]);
        setSubImages(images.slice(0));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    setLoading(true);
    fetchData();
  }, [productId, colorId]);

  const handleSelectMainImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="flex flex-wrap">
      {loading && <ProductSkeleton />}
      {loading ? (
        <Skeleton
          variant="rounded"
          width={600}
          height={265}
          sx={{ marginLeft: 2 }}
        />
      ) : (
        <>
          <div className="max-h-[25rem] w-1/4 max-w-[12rem] overflow-x-hidden overflow-y-scroll">
            {subImages.map((image) => (
              <div
                key={image}
                className="w-full p-1 transition-all duration-100"
                onClick={() => handleSelectMainImage(image)}
                onMouseEnter={() => setMainImage(image)}
              >
                {/* <img 
            src={image} 
            alt="Sub product image" 
            className="border border-secondary-4 hover:border-2 w-full hover:opacity-75 transition-opacity duration-300"
            /> */}
                <LazyLoadImage
                  className="h-full w-full object-cover"
                  alt="Sub product image"
                  height={140}
                  src={image}
                  width={280}
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
              </div>
            ))}
          </div>
          <div className="ml-1 mt-1 max-h-[26rem] w-3/4">
            {/* <img 
          src={mainImage} 
          alt="Main product image" 
          className="max-w-full border border-secondary-4 max-h-[26rem]" 
        /> */}
            <LazyLoadImage
              className="h-full w-full object-cover"
              alt="Main product image"
              height={140}
              src={mainImage}
              width={280}
              onError={(e: any) => {
                e.currentTarget.src =
                  "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
              }}
              effect="blur"
              wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
              }}
              style={{ transition: "transform 0.3s ease" }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImages;
