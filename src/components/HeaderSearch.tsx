import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearch } from '@/redux/reducers/search_reducers';
import { product } from '@/redux/reducers/slug_reducers';
import { removeSub } from '@/redux/reducers/subCategories';
import { RootState } from '@/redux/store/store';

interface ISlugState {
    slugId: string;
    slugCategoryName: string;
    slugCategorySlug: string;
}

const HeaderSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (searchValue === '') return;

        dispatch(setSearch({ value: searchValue }));
        dispatch(product({ 
            slugId: 'search', 
            slugCategoryName: 'Tìm kiếm', 
            slugCategorySlug: `Tìm kiếm sản phẩm: ${searchValue}` } as ISlugState));
        dispatch(removeSub());
        navigate('/product')
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <div 
        onClick={handleSearch}
        className="flex flex-row items-center border-2 border-dark-1 rounded-full px-5 py-2 group/search-header hover:bg-dark-1 focus-within:bg-dark-1 cursor-pointer"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-dark-1 group-hover/search-header:stroke-white group-focus-within/search-header:stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
            placeholder="Nhập sản phẩm cần tìm" 
            className="w-0 h-0 border-none rounded-lg ml-2 p-2 text-dark-1 text-lg focus:w-60 focus:h-8 group-hover/search-header:w-60 group-hover/search-header:h-8 transition-width duration-700" 
            value={searchValue}
            onChange={handleInputChange}
        />
        <div className="pl-2 text-xl text-dark-1 font-medium group-hover/search-header:text-white group-focus-within/search-header:text-white">Tìm kiếm</div>
        </div>
    );
};

export default HeaderSearch;