import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mainApi } from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";
import { useDispatch, useSelector } from "react-redux";
import { removeSearch } from "@/redux/reducers/search_reducers";
import { redirectSub } from "@/redux/reducers/subCategories";

interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

const SubCategoryList = () => {
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  function handleSubCategory(subcategorySlug: any) {
    dispatch(redirectSub(subcategorySlug));
    dispatch(removeSearch());
  }

  const getAllSubCategories = async () => {
    try {
      const result = await mainApi.get(apiEndpoints.GET_SUBCATEGORIES);
      const data = result.data.data;
      setSubCategories(
        data.map((item: any) => {
          return {
            id: item._id,
            name: item.subcategoryName,
            slug: item.subcategorySlug,
          };
        })
      );
    } catch (error: any) {
      console.log("error sub categories");
    }
  };

  useEffect(() => {
    getAllSubCategories();
  }, []);

  return (
    <div className="w-full">
      {subCategories.map((subCategory, index) => {
        return (
          <Link
            key={index}
            to={`/product/${subCategory.slug}`}
            onClick={() => handleSubCategory(subCategory)}
          >
            <p className="w-full py-2 text-base font-semibold text-black hover:bg-gray-200">
              {subCategory.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default SubCategoryList;
