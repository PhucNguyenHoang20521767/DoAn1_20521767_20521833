import { getLatestBlogPost } from "@/api/api_function";
import React from "react";
import { IBlogPost } from "./Title/BlogList";
import NewestRow from "./NewestRow";

const Newest = () => {
  const [blogPosts, setBlogPosts] = React.useState<IBlogPost[]>([]);
  React.useEffect(() => {
    try {
      getLatestBlogPost().then(async (res) => {
        const Res2 = res.data.data;
        const Res3 = Res2.filter((blogPost: IBlogPost) => {
          return !blogPost.isHidden;
        });
        setBlogPosts(Res3);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <div className="rounded-lg border-2 p-4">
        <h2 className="text-2xl">Bài viết mới nhất</h2>
        <hr className="border" />
        {blogPosts.map((blogPost) => {
          return (
            <NewestRow
              blogPost={blogPost}
              height={12}
              width={20}
              key={blogPost._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Newest;
