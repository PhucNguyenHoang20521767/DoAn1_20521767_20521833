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
          console.log('dt', data);
          setSubCategories(
            data.map((item: any) => {
              return {
                id: item._id,
                name: item.subcategoryName,
                slug: item.subcategorySlug,
              };
            })
          );
        //   setSubCategories(data);
          // console.log('sub', subCategories);
        } catch (error: any) {
          console.log(error);
        }
    };

    useEffect(() => {
    getAllSubCategories();
    }, []);

    return (
        <div 
        className='w-full'
        >
          {subCategories.map((subCategory, index) => {
            return (
              <Link
                key={index}
                to={`/product/${subCategory.slug}`}
                onClick={() => handleSubCategory(subCategory)}
              >
                <p 
                className='w-full py-2 hover:bg-gray-200 text-black text-lg font-semibold'
                >
                {subCategory.name}
                </p>
              </Link>
            );
          })}
        </div>
    );
};

export default SubCategoryList;