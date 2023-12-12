import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  getCustomerById,
  getAvatar,
  getAllFeedbackImages,
  previewAttachment,
  getAvatarById,
} from "@/api/api_function";
import { Rating, Avatar, Stack } from "@mui/material";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import FeedbackImage from "./FeedbackImage";
import FeedbackRespone from "./FeedbackRespone";
import { set } from "react-hook-form";

const Feedback = ({ feedback }: any) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [customer, setCustomer] = useState<any>(null);
  const [avatar, setAvatar] = useState<string>("");
  const [product, setProduct] = useState<any>(null);
  const [color, setProductColor] = useState<any>(null);
  const [productImageUrl, setProductImageUrl] = useState<any[]>([]);
  const [feedbackRespone, setFeedbackRespone] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const createdAtDate = new Date(feedback.createdAt);
  const createdAtDateString = createdAtDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    setFeedbackRespone(feedback.feedbackResponse);
    getCustomerById(feedback.customerId, currentUser).then((res) => {
      setCustomer(res.data.data);
      getAvatarById(res.data.data._id).then((res) => {
        setAvatar(res.data.data);
        // console.log("ava", res.data.data);
      });
      getAllFeedbackImages(feedback._id).then((res) => {
        setProductImageUrl(res.data.data);
      });
    });
  }, [feedback]);

  return (
    <>
      <section key={feedback._id} className="mx-auto my-2 max-w-screen-md">
        <div>
          {/* Feedback */}
          <section className="flex items-center">
            <section className="ml-10">
              <Avatar alt="User" src={avatar} />
            </section>
            <div className="ml-2">
              <div className="text-md font-medium">
                {customer?.customerLastName + " " + customer?.customerFirstName}
              </div>
              <div className="pt-2">
                <Rating
                  name="read-only"
                  precision={0.5}
                  value={feedback.feedbackRating}
                  readOnly
                />
              </div>
            </div>
          </section>
          <section className="ml-10">
            <div className="text-md text-gray-600">
              {feedback.feedbackTitle} {"("}
              {createdAtDateString.replace(/\//g, ".")}
              {")"}
            </div>

            <div className="text-lg text-black">{feedback.feedbackContent}</div>

            <div>
              {productImageUrl.map((image: any, index: number) => {
                return (
                  <div key={index} className="mr-2 inline-block">
                    <FeedbackImage image={image} />
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <FeedbackRespone feedbackRespone={feedbackRespone}></FeedbackRespone>
        <hr className="mx-4" />
      </section>
      {/* <hr className='w-full'/> */}
    </>
  );
};

export default Feedback;
