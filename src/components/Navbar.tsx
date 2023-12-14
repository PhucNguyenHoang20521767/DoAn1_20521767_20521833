// import { Link } from "react-router-dom";
// import HeaderSearch from "./HeaderSearch";
// import CategoryList from "./Categories";
// import SubCategoryList from "./SubCategories";

// interface NavbarProps {
//   nav: boolean;
//   handleRemoveSub: () => void;
// }

// const Navbar = ({ nav, handleRemoveSub }: NavbarProps) => {
//   return (
//     <nav className="relative my-auto bg-white">
//       {/* <nav className="hidden md:flex justify-center md:items-center flex-wrap plr-6"> */}
//       <nav
//         className={
//           nav
//             ? "hidden"
//             : "plr-6 flex-wrap justify-center md:flex md:items-center"
//         }
//       >
//         <div className="lg:flex lg:w-auto">
//           <div className="block bg-white py-4 transition md:hidden">
//             <div className="mx-2">
//               <HeaderSearch />
//             </div>
//           </div>
//           <div className="text-base md:shrink-0">
//             <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color block px-12 py-3 text-center lg:inline-block">
//               <Link
//                 to="product"
//                 className="text-primary-0"
//                 onClick={handleRemoveSub}
//               >
//                 SẢN PHẨM
//               </Link>
//               <div className="invisible absolute left-0 z-10 mt-3 h-0 w-0 bg-white p-2 shadow-md transition-height duration-700 group-hover/product-nav-item:visible group-hover/product-nav-item:h-max group-hover/product-nav-item:w-full">
//                 <div className="flex flex-col">
//                   <Link
//                     to={"product"}
//                     onClick={handleRemoveSub}
//                     className="block"
//                   >
//                     <p className="block w-full px-[10rem] py-2 text-base font-semibold text-black hover:bg-gray-200 md:px-10">
//                       Tất cả sản phẩm
//                     </p>
//                   </Link>
//                   <CategoryList />
//                 </div>
//               </div>
//             </div>
//             <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
//               <a className="cursor-pointer text-primary-0">PHÒNG</a>
//               <div className="invisible absolute left-0 z-10 mt-3 h-0 w-0 bg-white p-2 shadow-md transition-height duration-700 group-hover/product-nav-item:visible group-hover/product-nav-item:h-max group-hover/product-nav-item:w-full">
//                 <div className="flex justify-center">
//                   <SubCategoryList />
//                 </div>
//               </div>
//             </div>
//             <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
//               <Link to={"blog/news"}>
//                 <button className="text-primary-0">GÓC CẢM HỨNG</button>
//               </Link>
//             </div>
//             <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
//               <Link to={"service"}>
//                 <button className="text-primary-0">DỊCH VỤ</button>
//               </Link>
//             </div>
//             <div className="group/product-nav-item header-nav-item header-nav-item-underline header-nav-item-underline-color mt-4 block px-12 py-3 text-center lg:mt-0 lg:inline-block">
//               <Link to={"aboutus"} className="text-primary-0">
//                 VỀ CHÚNG TÔI
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </nav>
//   );
// };

// export default Navbar;
