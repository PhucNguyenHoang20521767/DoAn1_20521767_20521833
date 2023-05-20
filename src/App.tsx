import { useEffect } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

import Home from '@/pages/Home/home';
import Signin from '@/pages/SignIn/signin';
import Account from '@/pages/Account/account';
import Rootpage from '@/pages/RootPage/rootpage';
import Notfound from '@/pages/NotFound/notfound';
import Information from '@/components/Information';
import Address from  '@/components/Address';
import Bill from '@/components/Bill';
import ResetPassword from '@/components/ResetPassword';
import exp from "constants";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Rootpage/>}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home/>} />
            <Route path="signin" element={<Signin/>} />
            <Route path="account" element={<Account />} >
                <Route index element={<Information />} />
                <Route path="information" element={<Information/>} ></Route>
                <Route path='address' element={<Address/>}></Route>
                <Route path='bill' element={<Bill/>}></Route>
                <Route path='resetpassword' element={<ResetPassword/>}></Route>
            </Route>

            <Route path='*' element={<Notfound/>} />
        </Route>
    )
);

const AppRouter = () => {
    return(
        <RouterProvider router={router}/>
    )
}

export default AppRouter;
