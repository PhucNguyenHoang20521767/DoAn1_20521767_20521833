import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";

interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

interface Crumb {
  en: string;
  vi: string;
}

// interface Props {
//   onCurrentPageChange: (currentPage: Crumb) => void;
// }

export default function Breadcrumbs() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.sub.currentPage);
  const currentProduct = useSelector(
    (state: RootState) => state.product.currentProduct
  );
  const location = useLocation();

  let currentLink = "";

  // const crumbs = location.pathname.split('/')
  //   .filter(crumb => crumb !== '')
  //   .map((crumb, index, array) => {
  //     let crumbObj = {
  //       en: crumb,
  //       vi: ''
  //     }
  //     if (crumb === 'product') {
  //       crumbObj.vi = 'Sản phẩm'
  //     }
  //     else if (crumb === 'table') {
  //       crumbObj.vi = 'Bàn'
  //     }
  //     else if (crumb === 'chair') {
  //       crumbObj.vi = 'Ghế'
  //     }
  //     else if (crumb === 'bed') {
  //       crumbObj.vi = 'Giường'
  //     }
  //     else if (crumb === 'sofa') {
  //       crumbObj.vi = 'Sofa'
  //     }
  //     currentLink += `/${crumb}`

  //   return (
  //     <div className="crumb flex flex-justify-start" key={crumb}>
  //       <Link to={currentLink} className="text-gray-500 hover:text-gray-700">{crumbObj.vi}</Link>
  //       {index !== array.length - 1 && <span className="mx-2 text-gray-500">/</span>}
  //     </div>
  //   )
  // })

  return (
    <div className="breadcrumbs flex items-center text-sm text-gray-500">
      <Link to="/" className="text-gray-500 hover:text-gray-700">
        Trang chủ
      </Link>
      <span className="mx-2 text-gray-500">/</span>
      <Link to="/product" className="text-gray-500 hover:text-gray-700">
        Sản phẩm
      </Link>
      <span className="mx-2 text-gray-500">/</span>
      {currentPage ? (
        <Link
          to={currentPage.slug}
          className="text-gray-500 hover:text-gray-700"
        >
          {currentPage.name}
        </Link>
      ) : (
        <span className="text-gray-500 hover:text-gray-700">
          {currentProduct ? currentProduct.slugCategoryName : "Tất cả sản phẩm"}
        </span>
      )}
    </div>
  );
}
