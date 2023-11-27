import { Link } from "react-router-dom";

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
  return (
    <section className="mx-8 py-4">
      <div className="breadcrumbs flex items-center text-sm text-gray-500">
        <Link to="/" className="text-gray-500 hover:text-gray-700">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/blog/news" className="text-gray-500 hover:text-gray-700">
          Góc cảm hứng
        </Link>
      </div>
    </section>
  );
}
