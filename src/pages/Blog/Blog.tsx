import ScrollToTop from "@/utils/scroll_top";
import Breadcrumbs from "./Component/Breadcrumbs";
import Title from "./Component/Title/Title";
import Newest from "./Component/Newest";
import { Outlet } from "react-router-dom";

export const Blog = () => {
  return (
    <div>
      <ScrollToTop />
      <Breadcrumbs></Breadcrumbs>
      <div className="mx-[10rem] flex justify-center gap-4">
        <div className="w-3/12">
          <Newest></Newest>
        </div>
        <div className="w-9/12 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
