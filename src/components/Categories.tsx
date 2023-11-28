import { useState, useEffect } from "react";
import { mainApi } from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { redirectSub } from "@/redux/reducers/subCategories";
import { removeSearch } from "@/redux/reducers/search_reducers";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const CategoryList: React.FC = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  function handleCategory(categorySlug: any) {
    dispatch(redirectSub(categorySlug));
    dispatch(removeSearch());
  }

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const result = await mainApi.get(apiEndpoints.GET_CATEGORIES);
        const data = result.data.data;
        setCategories(
          data.map((item: any) => {
            return {
              id: item._id,
              name: item.categoryName,
              slug: item.categorySlug,
            };
          })
        );
      } catch (error: any) {
        console.log(error);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-full">
        {categories.map((category, index) => {
          return (
            <div key={category.id}>
              <Link
                to={`/product/${category.slug}`}
                className="block w-full px-[10rem] py-2 text-base font-semibold text-black hover:bg-gray-200 md:px-10"
                onClick={() => handleCategory(category)}
              >
                <p>{category.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
