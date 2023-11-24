import React from "react";
import { IBlogPost } from "./BlogList";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  blogPost: IBlogPost;
}

const BlogListRow = ({ blogPost }: Props) => {
  const navigate = useNavigate();
  return (
    <article className="my-8">
      <div className="flex gap-4">
        <div
          className="max-h-[12rem] min-h-[12rem] min-w-[20rem] max-w-[20rem] overflow-hidden"
          onClick={() => {
            navigate(`/blog/content/${blogPost._id}`);
          }}
        >
          <LazyLoadImage
            className="object-cover"
            height={192}
            width={320}
            alt="Title image"
            src={blogPost.blogPostThumbnail}
            style={{ transition: "transform 0.8s ease" }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">{blogPost.blogPostTitle}</h1>
          <p className="text-xl text-gray-500">{blogPost.blogPostTag}</p>
          <p>{blogPost.blogPostDescription}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogListRow;
