import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  CardActionArea,
} from "@mui/material";
import { addOrRemoveProductFromWishlist } from "@/api/api_function";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { changeWishlist } from "@/redux/reducers/wishlist_reducers";
import { notify } from "@/redux/reducers/notify_reducers";

interface Props {
  productId: string;
}

const IconFavourite = ({ productId }: Props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  function handleFavourite() {
    if (currentUser) {
      addOrRemoveProductFromWishlist(currentUser, productId).then((res) => {
        dispatch(changeWishlist());
        dispatch(
          notify({
            isSuccess: true,
            isError: false,
            isInfo: false,
            message: "Thêm vào danh sách yêu thích thành công",
          })
        );
      });
    }
  }

  return (
    <div>
      <IconButton onClick={() => handleFavourite()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 hover:text-secondary-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000000"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </IconButton>
    </div>
  );
};

export default IconFavourite;
