import { useEffect, useState } from "react";
import { IDiscount } from "./CampaignCarousel";
import { getAllValidDiscounts } from "@/api/api_function";
import { addDiscount } from "@/redux/reducers/discount_reducers";
import { useDispatch } from "react-redux";

const useFetchDiscount = () => {
  const dispatch = useDispatch();
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
        dispatch(addDiscount({ currentDiscount: result }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { discounts };
};

export default useFetchDiscount;
