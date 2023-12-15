import { Button } from "@mui/material";
import { styleButtonAddCart } from "@/utils/ui";
import {
  addItemToCart,
  getProductById,
  getProductColor,
} from "@/api/api_function";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useState } from "react";

interface Props {
  product_id: string;
}

const AddToCartButton: React.FC<Props> = ({ product_id }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const currentCart = useSelector((state: RootState) => state.cart);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleAddToCartButton = async () => {
    const productRes = await getProductById(product_id);
    if (productRes.data.data) {
      const product = productRes.data.data;
      const productColorRes = await getProductColor(product._id);
      const productColor = productColorRes.data.data;

      if (currentUser) {
        try {
          console.log("cartId", currentCart._id);
          console.log("currentUser", currentUser);
          console.log("productId", product._id);
          console.log("productColor", productColor[0]._id);
          console.log("quantity", 1);
          addItemToCart(
            currentCart._id,
            currentUser,
            product._id,
            productColor[0]._id,
            1
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        // setDisabled(true);
      }
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginRight: "2px" }}
      sx={styleButtonAddCart}
      onClick={handleAddToCartButton}
      disabled={disabled}
    >
      Thêm vào giỏ
    </Button>
  );
};

export default AddToCartButton;
