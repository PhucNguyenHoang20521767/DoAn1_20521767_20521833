import React from 'react'
import { useState, useEffect } from 'react'
import {
    previewAttachment
} from '@/api/api_function'

const FeedbackImage = ({image}: any) => {
    const [imagePreview, setImagePreview] = useState<any>();
    useEffect(() => {
        console.log('image', image);
        previewAttachment(image[0].feedbackImage).then((res) => {
            setImagePreview(res.data.attachmentURL)
            console.log('imagePreview', res.data);
        });
    }, [image]);

  return (
<>
    {
        imagePreview ? (
            <div className='w-full h-40'>
                <img src={imagePreview} className='w-full h-full object-cover' />
            </div>
        ) : (
 <> </>
        )
    }
</>
  )
}

export default FeedbackImage