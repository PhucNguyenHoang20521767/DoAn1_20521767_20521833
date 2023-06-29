import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface Crumb {
  en: string;
  vi: string;
}

export default function Breadcrumbs() {
  const location = useLocation()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const currentProduct = useSelector((state: RootState) => state.product.currentProduct)

  let currentLink = ''

//   const crumbs = location.pathname.split('/')
//     .filter(crumb => crumb !== '')
//     .map((crumb, index, array) => {
//       let crumbObj = {
//         en: crumb,
//         vi: ''
//       }
//       if (crumb === 'collection') {
//         crumbObj.vi = 'Bộ sưu tập'
//       }
//       currentLink += `/${crumb}`

//       return (
//         <div className="crumb flex flex-justify-start" key={crumb}>
//           <Link to={currentLink} className="text-gray-500 hover:text-gray-700">{crumbObj.vi}</Link>
//           {index !== array.length - 1 && <span className="mx-2 text-gray-500">/</span>}
//         </div>
//       )
//     })

  return (
    <div className="breadcrumbs flex items-center text-sm text-gray-500">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Trang chủ</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/product" className="text-gray-500 hover:text-gray-700">Sản phẩm</Link>
        <span className="mx-2 text-gray-500">/</span>
      {/* {crumbs} */}
    </div>
  )
}