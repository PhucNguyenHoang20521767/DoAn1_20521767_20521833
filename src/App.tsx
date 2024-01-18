import { useEffect, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import Home from "@/pages/Home/home";
import Aboutus from "@/pages/AboutUs/aboutus";
import Product from "@/pages/Product/product";
import Product_item from "@/pages/Product/product_item";
import Collection from "./pages/Collection/collection";
import Signin from "@/pages/SignIn/signin";
import Account from "@/pages/Account/account";
import Rootpage from "@/pages/RootPage/rootpage";
import Notfound from "@/pages/NotFound/notfound";
import Information from "@/components/Information";
import Address from "@/components/Address";
import BillLayout from "@/components/BillLayout";
import Bill from "@/components/Bill";
import BillItem from "@/components/BillItem";
import ResetPassword from "@/components/ResetPassword";
import Order from "./pages/Order/order";
import OrderSuccess from "./pages/Order/orderSuccess";
import { Blog } from "./pages/Blog/Blog";
import ServicePage from "./pages/Service/Service";
// import Title from "./pages/Blog/Component/Title/Title";
// import Content from "./pages/Blog/Component/Content/Content";
const Title = lazy(() => import("./pages/Blog/Component/Title/Title"));
const Content = lazy(() =>
  delayFunction(import("./pages/Blog/Component/Content/Content"))
);
import OrderConfirm from "./pages/Order/orderConfirm";

function delayFunction(promise: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, 100);
  }).then(() => promise);
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootpage />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Order />}>
        <Route path="success" element={<OrderSuccess />} />
      </Route>
      <Route path="order" element={<OrderConfirm />} />
      <Route path="product" element={<Product />}>
        <Route path=":id" element={<Product_item />} />
        <Route path=":id/:discountId" element={<Product_item />} />
      </Route>
      <Route path="collection/:id" element={<Collection />} />
      <Route path="blog" element={<Blog />}>
        <Route path="news" element={<Title />} />
        <Route path="content/:id" element={<Content />} />
      </Route>
      <Route path="service" element={<ServicePage />} />
      <Route path="aboutus" element={<Aboutus />} />
      <Route path="signin" element={<Signin />} />
      <Route path="account" element={<Account />}>
        <Route index element={<Information />} />
        <Route path="information" element={<Information />}></Route>
        <Route path="address" element={<Address />}></Route>
        <Route path="bill" element={<BillLayout />}>
          <Route index element={<Bill />} />
          <Route path=":id" element={<BillItem />} />
        </Route>
        <Route path="resetpassword" element={<ResetPassword />}></Route>
      </Route>

      <Route path="*" element={<Notfound />} />
    </Route>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
