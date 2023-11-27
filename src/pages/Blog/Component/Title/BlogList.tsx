import { useState, useEffect } from "react";
import { getAllBlogPosts } from "@/api/api_function";
import BlogListRow from "./BlogListRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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

export const convertTagToVietnamese = (tag: string): string => {
  switch (tag) {
    case "News":
      return "Tin tức";
    case "Tips":
      return "Mẹo hay";
    case "Inspiration":
      return "Cảm hứng";
    default:
      return tag;
  }
};

const BlogList = ({ search }: Props) => {
  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      getAllBlogPosts(search, page, 10).then(async (res) => {
        const blogPostsRes = res.data.data;
        const Res2 = await blogPostsRes.sort((a: IBlogPost, b: IBlogPost) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        const Res3 = Res2.filter((blogPost: IBlogPost) => {
          return !blogPost.isHidden;
        });
        if (Res3) setBlogPosts(Res3);
        if (Res3.length === 0) {
          setPage(1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [search, page]);

  return (
    <div className="grid grid-cols-1">
      {blogPosts.map((blogPost) => {
        const vietnameseTag = convertTagToVietnamese(blogPost.blogPostTag);
        const updatedBlogPost = { ...blogPost, blogPostTag: vietnameseTag };
        return <BlogListRow blogPost={updatedBlogPost} key={blogPost._id} />;
      })}
      <div className="flex justify-center py-8">
        <Stack spacing={2}>
          <Pagination count={3} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default BlogList;
