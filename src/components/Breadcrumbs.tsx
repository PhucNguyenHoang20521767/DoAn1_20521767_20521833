import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom"

interface Crumb {
  en: string;
  vi: string;
}

interface Props {
  onCurrentPageChange: (currentPage: Crumb) => void;
}

export default function Breadcrumbs({ onCurrentPageChange }: Props ) {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, index, array) => {
      let crumbObj = {
        en: crumb,
        vi: ''
      }
      if (crumb === 'product') {
        crumbObj.vi = 'Sản phẩm'
      }
      else if (crumb === 'table') {
        crumbObj.vi = 'Bàn'
      }
      else if (crumb === 'chair') {
        crumbObj.vi = 'Ghế'
      }
      else if (crumb === 'bed') {
        crumbObj.vi = 'Giường'
      }
      else if (crumb === 'sofa') {
        crumbObj.vi = 'Sofa'
      }
      currentLink += `/${crumb}`

      return (
        <div className="crumb flex flex-justify-start" key={crumb}>
          <Link to={currentLink} className="text-gray-500 hover:text-gray-700">{crumbObj.vi}</Link>
          {index !== array.length - 1 && <span className="mx-2 text-gray-500">/</span>}
        </div>
      )
    })

  useEffect(() => {
  const currentPage = {
    en: location.pathname.split('/').pop() || '',
    vi: ''
  }
  if (currentPage.en === 'product') {
    currentPage.vi = 'Sản phẩm'
  }
  else if (currentPage.en === 'table') {
    currentPage.vi = 'Bàn'
  }
  else if (currentPage.en === 'chair') {
    currentPage.vi = 'Ghế'
  }
  else if (currentPage.en === 'bed') {
    currentPage.vi = 'Giường'
  }
  else if (currentPage.en === 'sofa') {
    currentPage.vi = 'Sofa'
  }
  console.log(currentPage)
  //set currentPage in product.tsx
  onCurrentPageChange(currentPage)
}, [location.pathname])

  return (
    <div className="breadcrumbs flex items-center text-sm text-gray-500">
      <Link to="/" className="text-gray-500 hover:text-gray-700">Trang chủ</Link>
      <span className="mx-2 text-gray-500">/</span>
      {crumbs}
    </div>
  )
}