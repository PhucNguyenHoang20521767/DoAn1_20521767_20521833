import { useEffect, useState } from 'react';
import { getAllProductImageUrlByColor } from '@/api/api_function';
import Skeleton from '@mui/material/Skeleton';

import ProductSkeleton from '@/components/loaders/productSkeleton';

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
    <div className="flex flex-wrap pl-4">
      {loading && <ProductSkeleton />}
      {loading ? (
        <Skeleton variant="rounded" width={600} height={265} sx={{ marginLeft: 2 }} />
      ) : (
      <>
      <div className="w-1/4 overflow-y-scroll max-w-[8rem] max-h-[20rem]">
        {subImages.map((image) => (
          <div
            key={image}
            className="w-full p-1 transition-all duration-100"
            onClick={() => handleSelectMainImage(image)}
            onMouseEnter={() => setMainImage(image)}
          >
            <img 
            src={image} 
            alt="Sub product image" 
            className="border border-secondary-4 hover:border-2 w-full hover:opacity-75 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
      <div className="w-3/4 max-h-[20rem] ml-1">
        <img 
          src={mainImage} 
          alt="Main product image" 
          className="w-full border border-secondary-4 max-h-[20rem]" 
        />
      </div>
      </>
      )}
    </div>
  );
};

export default ProductImages;