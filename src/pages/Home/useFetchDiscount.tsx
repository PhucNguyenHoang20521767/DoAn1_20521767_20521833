import { IDiscount } from "./CampaignCarousel";
import { useEffect, useState } from "react";
import { getAllValidDiscounts } from "@/api/api_function";

const useFetchDiscount = () => {
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllValidDiscounts();
        const data: IDiscount[] = res.data.data;
        const result = data.map((discount: IDiscount, index: number) => ({
          ...discount,
          index: index,
        }));
        setDiscounts(result);
        console.log("result", result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { discounts };
};

export default useFetchDiscount;
