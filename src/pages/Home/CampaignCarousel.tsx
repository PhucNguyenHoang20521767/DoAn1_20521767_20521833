import ImageSlider from "@/components/ImageSlider";
import { useEffect, useState } from "react";
import { getAllValidDiscounts } from "@/api/api_function";
import { addDiscount } from "@/redux/reducers/discount_reducers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export interface IDiscount {
  discountThumbnail: string;
  discountPercent: number;
  _id: string;
  discountName: string;
  discountDescription?: string;
  discountStartDate: string;
  discountEndDate: string;
  createdAt: string;
  updatedAt: string;
  index?: number;
}

const CampaignCarousel = () => {
  const dispatch = useDispatch();
  const currentDiscount = useSelector(
    (state: RootState) => state.discount.currentDiscount
  );
  const allProducts = useSelector((state: RootState) => state.all.allProduct);
  // const [discounts, setDiscounts] = useState<IDiscount[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllValidDiscounts();
        const data: IDiscount[] = res.data.data;
        const result = data.map((discount: IDiscount, index: number) => ({
          ...discount,
          index: index,
        }));
        // setDiscounts(result);
        dispatch(addDiscount({ currentDiscount: result }));
      } catch (error) {
        console.error(error);
      }
    };

    if (currentDiscount.length === 0) {
      fetchData();
    }
  }, [allProducts]);

  return (
    <div>
      <ImageSlider></ImageSlider>
    </div>
  );
};

export default CampaignCarousel;
