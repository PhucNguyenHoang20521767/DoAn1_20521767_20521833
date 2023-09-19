import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
// import { addToCart } from '@/redux/actions/cartActions';
// import { cache } from '@/utils/cache';

interface Props {
  productId: string;
}

const AddToCartButton: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  function handleClick() {
    if (user) {
    } else {
    }
  }

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Thêm vào giỏ
    </Button>
  );
};

export default AddToCartButton;
