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
      getAllBlogPosts(search, 1, 10).then((res) => {
        const blogPostsRes = res.data.data;
        blogPostsRes.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setBlogPosts(blogPostsRes);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {blogPosts.map((blogPost) => {
        return <BlogListRow blogPost={blogPost} key={blogPost._id} />;
      })}
    </div>
  );
};

export default BlogList;
