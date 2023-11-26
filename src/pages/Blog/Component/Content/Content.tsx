import { getBlogPostById } from "@/api/api_function";
import React from "react";
import { useParams } from "react-router-dom";
import { IBlogPost } from "../Title/BlogList";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import ReactMarkdown from "react-markdown";
import { set } from "react-hook-form";
import { convertTagToVietnamese } from "../Title/BlogList";
// import remarkGfm from "remark-gfm";
import MarkdownComponent from "./MarkdownComponent";

const Content = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = React.useState<IBlogPost>();
  const [date, setDate] = React.useState<string>("");

  React.useEffect(() => {
    const getPost = async () => {
      try {
        if (!id) return;
        const res = await getBlogPostById(id);
        setBlogPost(res.data.data);
        setDate(
          new Date(res.data.data?.updatedAt).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  return (
    <>
      {!blogPost?.isHidden ? (
        <div>
          <div className="overflow-hidden max-md:h-[6rem] max-md:w-[10rem] md:max-h-[36rem] md:min-h-[36rem] md:min-w-[60rem] md:max-w-[60rem]">
            <LazyLoadImage
              className="object-cover"
              height={576}
              width={960}
              effect="black-and-white"
              wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
              }}
              alt="Title image"
              src={blogPost?.blogPostThumbnail}
            />
          </div>
          <div>
            <p className="text-2xl text-gray-500">{date}</p>
          </div>
          <div className="my-8 space-y-4 md:min-w-[60rem]">
            <h1 className="w-[624px] text-4xl font-bold">
              {blogPost?.blogPostTitle}
            </h1>
            <p className="text-2xl text-gray-500">
              {blogPost && convertTagToVietnamese(blogPost.blogPostTag)}
            </p>
            <p className="prose lg:prose-xl">{blogPost?.blogPostDescription}</p>
          </div>
          <div className="markdown prose space-y-4 lg:prose-xl">
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blogPost?.blogPostContent || ""}
            </ReactMarkdown> */}
            <MarkdownComponent markdown={blogPost?.blogPostContent || ""} />
          </div>
          <div>
            {/* author */}
            <div className="my-8 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Tác giả:</h1>
                <p className="text-xl text-gray-500">
                  {blogPost?.blogPostAuthor}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[90vh] items-center justify-center">
          <h1 className="text-4xl font-bold">Bài viết không tồn tại</h1>
        </div>
      )}
    </>
  );
};

export default Content;
