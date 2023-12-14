import { useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
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
  const { id } = useParams<{ id: string }>();
  const currentPage = useSelector((state: RootState) => state.sub.currentPage);
  const currentProduct = useSelector(
    (state: RootState) => state.product.currentProduct
  );
  const location = useLocation();

  let currentLink = "";

  useEffect(() => {
    console.log("id", id);
    if (id) {
      switch (id) {
        case "living-room":
          dispatch({
            type: "REDIRECTSUBCATEGORY",
            payload: {
              name: "Phòng khách",
              id: "647f2aa9aa7daf4c8c410f4b",
              slug: "living-room",
            },
          });
          break;
        case "kitchen":
          dispatch({
            type: "REDIRECTSUBCATEGORY",
            payload: {
              name: "Nhà bếp",
              id: "647f2a97aa7daf4c8c410f48",
              slug: "kitchen",
            },
          });
          break;
        case "bedroom":
          dispatch({
            type: "REDIRECTSUBCATEGORY",
            payload: {
              name: "Phòng ngủ",
              id: "647f2ab4aa7daf4c8c410f4e",
              slug: "bedroom",
            },
          });
          break;
        case "outside":
          dispatch({
            type: "REDIRECTSUBCATEGORY",
            payload: {
              name: "Ngoài trời",
              id: "647f2ac2aa7daf4c8c410f51",
              slug: "outside",
            },
          });
          break;
        case "discount":
          dispatch({
            type: "REDIRECTSUBCATEGORY",
            payload: {
              name: "Giảm giá",
              slug: "discount",
            },
          });
          break;
        default:
          return;
      }
    }
  }, [id]);

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      let crumbObj = {
        en: crumb,
        vi: "",
      };
      if (crumb === "product") {
        crumbObj.vi = "Sản phẩm";
      } else if (crumb === "table") {
        crumbObj.vi = "Bàn";
      } else if (crumb === "chair") {
        crumbObj.vi = "Ghế";
      } else if (crumb === "bed") {
        crumbObj.vi = "Giường";
      } else if (crumb === "sofa") {
        crumbObj.vi = "Sofa";
      }
      currentLink += `/${crumb}`;

      return (
        <div className="crumb flex-justify-start flex" key={crumb}>
          <Link to={currentLink} className="text-gray-500 hover:text-gray-700">
            {crumbObj.vi}
          </Link>
          {index !== array.length - 1 && (
            <span className="mx-2 text-gray-500">/</span>
          )}
        </div>
      );
    });

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
      {currentProduct ? (
        <Link to={currentPage.id} className="text-gray-500 hover:text-gray-700">
          {currentPage.name}
        </Link>
      ) : (
        <span className="text-gray-500 hover:text-gray-700">
          {currentProduct ? currentProduct.idCategoryName : "Tất cả sản phẩm"}
        </span>
      )}
    </div>
  );
}
