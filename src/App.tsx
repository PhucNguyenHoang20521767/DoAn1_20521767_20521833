// import './App.css';
// import Header from '@/components/Header';
// import Footer from './components/Footer';
// import AppRouter from '@/routers/router';

// function App() {
//   return (
//     <div className="App">
//       <AppRouter></AppRouter>
//       <Footer />
//     </div>
//   )
// }

// export default App;
import React from 'react';
import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import Home from '@/pages/Home/home';
import Signin from '@/pages/SignIn/signin';
import Account from '@/pages/Account/account';
import Rootpage from '@/pages/RootPage/rootpage';
import Notfound from '@/pages/NotFound/notfound';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Rootpage/>}>
            <Route index element={<Home />} />
            <Route path="account" element={<Account />} >
                <Route path="signin" element={<Signin/>} />
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
