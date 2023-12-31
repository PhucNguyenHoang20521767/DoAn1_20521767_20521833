import * as React from "react";
import { style } from "@/utils/ui";
import { createFeedback, saveFeedbackImage } from "@/api/api_function";
import { RootState } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "@/redux/reducers/notify_reducers";

import {
  Modal,
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
  CardActionArea,
  LinearProgress,
} from "@mui/material";
import ImagesUploader from "../customs/ImageUploader";
import { UploadFile } from "antd";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
  productColorId: string;
  orderId: string;
}

interface IReviewInput {
  title: string;
  reviewDetail: string;
  image: string;
}

function ReviewModal({
  open,
  setOpen,
  productId,
  productColorId,
  orderId,
}: Props) {
  //   const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(0);
  const [title, setTitle] = React.useState<string>("");
  const [reviewDetail, setReviewDetail] = React.useState<string>("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([]); // [{file: File, data_url: string}
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const _id = useSelector((state: RootState) => state.auth.id);

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const numberRating = rating ? rating : 0;
    createFeedback(
      currentUser,
      _id,
      productId,
      productColorId,
      orderId,
      numberRating,
      title,
      reviewDetail
    )
      .then((res) => {
        if (fileList.length > 0) {
          const feedbackId = res.data.data._id;
          saveFeedbackImage(currentUser, feedbackId, fileList)
            .then((res) => {
              console.log("res.data");
            })
            .catch((err) => {
              console.log(err);
            });
        }

        dispatch(
          notify({
            message: "Đánh giá thành công",
            isError: false,
            isSuccess: true,
            isInfo: false,
          })
        );
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          notify({
            message: "Đánh giá thất bại",
            isError: true,
            isSuccess: false,
            isInfo: false,
          })
        );
        setLoading(false);
      });
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đánh giá sản phẩm
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="my-1 flex justify-between">
              <label
                htmlFor="text"
                className="text-base font-semibold text-dark-1"
              >
                Đánh giá của bạn:
              </label>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div className="my-1">
              <label
                htmlFor="text"
                className="text-base font-semibold text-dark-1"
              >
                Tiêu đề (không bắt buộc):
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full rounded-sm border border-secondary-1 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-secondary-1 focus:ring-opacity-50`}
              />
            </div>
            <div className="my-1">
              <label
                htmlFor="text"
                className="text-base font-semibold text-dark-1"
              >
                Nhận xét của bạn:
              </label>
              <textarea
                className="form-textarea w-full"
                placeholder="Nhập nhận xét của bạn ở đây..."
                value={reviewDetail}
                onChange={(e) => setReviewDetail(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label
                htmlFor="text"
                className="text-base font-semibold text-dark-1"
              >
                Thêm hình ảnh (nếu có):
              </label>
              <ImagesUploader fileList={fileList} setFileList={setFileList} />
            </div>
            <button
              type="submit"
              className={`mt-3 w-full rounded-sm border border-secondary-1 bg-secondary-1 px-3 py-1 uppercase text-white
                hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                `}
            >
              Gửi nhận xét
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ReviewModal;
