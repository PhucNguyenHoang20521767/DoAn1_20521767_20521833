import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerWishlist,
  addOrRemoveProductFromWishlist,
  getProductById,
} from "@/api/api_function";
import ManySkeleton from "@/components/loaders/manySkeleton";

import FavouriteItem from "./FavouriteItem";

export const Favourite = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  // const isChange = useSelector((state: RootState) => state.wishlist.isChange);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      getCustomerWishlist(currentUser)
        .then(async (res) => {
          const wishlistItems = res.data.data;
          const wishlistWithProductNames = await Promise.all(
            wishlistItems.map(async (item: any) => {
              const product = await getProductById(item.productId);
              return {
                ...item,
                name: product.data.data.productName,
              };
            })
          );
          setWishlist(wishlistWithProductNames);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  }, [currentUser]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredWishlist = wishlist.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return (
      <div className="my-[10rem] p-5 text-xl">
        Vui lòng đăng nhập để xem sản phẩm!
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="my-[10rem] p-5 text-xl">
        Bạn chưa có sản phẩm yêu thích nào!
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex justify-end">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="my-2 w-96 rounded-md border border-gray-300 px-3 py-2 pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>
      {loading && <ManySkeleton />}
      {!loading && (
        <div className="">
          {/* <div className='text-2xl mb-5'>Sản phẩm yêu thích</div> */}
          <div className="">
            {filteredWishlist.map((item) => (
              <FavouriteItem
                key={item._id}
                item={item}
                setWishlist={setWishlist}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;
