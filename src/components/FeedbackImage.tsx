import React, { useState, useEffect } from "react";
import { previewAttachment } from "@/api/api_function";

type Props = {
  image: any;
};

const FeedbackImage = ({ image }: Props) => {
  const [imageShow, setImageShow] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      previewAttachment(image.feedbackImage).then((res) => {
        setImageShow(res.data.attachmentURL);
      });
    }
  }, [image]);

  return (
    <>
      {imageShow && (
        <div className="flex h-40 w-full justify-center">
          <img src={imageShow} className="h-full w-full object-cover" />
        </div>
      )}
    </>
  );
};

export default FeedbackImage;
