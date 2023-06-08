import React, { useEffect, useState } from 'react';
import { mainApi } from '@/api/main_api';
import * as apiEndpoints from '@/api/api_endpoints';

interface Props {
  id: string;
}

const CategoriesById: React.FC<Props> = ({ id }) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getCategoriesById = async (id: string) => {
  try {
    const result = await mainApi.get(apiEndpoints.GET_CATEGORIES_BY_ID(id));
    const data = result.data.data;
    if (Array.isArray(data)) {
      setCategories(
        data.map((item: any) => {
          return {
            id: item._id,
            name: item.categoryName,
            slug: item.categorySlug,
          };
        })
      );
    } else {
      console.log('Data is not an array');
    }
  } catch (error: any) {
    console.log(error);
  }
};

    getCategoriesById(id);
  }, [id]);

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
};

export default CategoriesById;