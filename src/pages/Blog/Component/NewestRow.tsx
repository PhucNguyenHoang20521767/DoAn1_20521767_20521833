import React from "react";
import { IBlogPost } from "./Title/BlogList";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  blogPost: IBlogPost;
  height?: number;
  width?: number;
}

const BlogListRow = ({ blogPost, height, width }: Props) => {
  if (!height || !width) {
    height = 48;
    width = 80;
  }
  const navigate = useNavigate();
  return (
    <article className="my-8">
      <div className="flex gap-4">
        <div
          className="min-h-12 min-w-20 max-w-20 max-h-12 w-1/3 overflow-hidden"
          onClick={() => {
            navigate(`/blog/content/${blogPost._id}`);
          }}
        >
          <LazyLoadImage
            className="object-cover"
            height={height * 4}
            width={width * 4}
            alt="Title image"
            src={blogPost.blogPostThumbnail}
            effect="blur"
            wrapperProps={{
              // If you need to, you can tweak the effect transition using the wrapper style.
              style: { transitionDelay: "1s" },
            }}
            style={{ transition: "transform 0.8s ease" }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>

        <div className="flex w-2/3 flex-col gap-2">
          <h1 className="text-xl font-semibold">{blogPost.blogPostTitle}</h1>
          <p className="text-md text-gray-500">{blogPost.blogPostTag}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogListRow;
