import { useState, useEffect } from "react";
import { getAllBlogPosts } from "@/api/api_function";
import BlogListRow from "./BlogListRow";

interface Props {
  search: string;
}

export interface IBlogPost {
  blogPostDescription: string;
  blogPostThumbnail: string;
  isHidden: boolean;
  _id: string;
  blogPostTitle: string;
  blogPostAuthor: string;
  blogPostTag: string;
  blogPostContent: string;
  createdAt: string;
  updatedAt: string;
}

const BlogList = ({ search }: Props) => {
  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);

  useEffect(() => {
    try {
      getAllBlogPosts(search, 1, 10).then(async (res) => {
        const blogPostsRes = res.data.data;
        const Res2 = await blogPostsRes.sort((a: IBlogPost, b: IBlogPost) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        const Res3 = Res2.filter((blogPost: IBlogPost) => {
          return !blogPost.isHidden;
        });
        console.log("rs2", Res2);
        if (Res3) setBlogPosts(Res3);
      });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  return (
    <div>
      {blogPosts.map((blogPost) => {
        return <BlogListRow blogPost={blogPost} key={blogPost._id} />;
      })}
    </div>
  );
};

export default BlogList;
