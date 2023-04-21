import React from 'react';
import { BrowserRouter as Routes, Navigate, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Signin from './pages/SignIn/signin';

const AppRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>}/>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/signin' element={<Signin/>}/>
        </Routes>
    )
}

export default AppRouter;
