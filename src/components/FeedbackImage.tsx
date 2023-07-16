import React, { useState, useEffect } from 'react';
import { previewAttachment } from '@/api/api_function';

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
        <div className='w-full h-40 flex justify-center'>
          <img src={imageShow} className='w-full h-full object-cover' />
        </div>
      )}
    </>
  );
};

export default FeedbackImage;