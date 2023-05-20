import React, {useEffect} from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import {mainApi} from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";

import {useDispatch} from "react-redux";
import {login} from "@/redux/reducers/auth_reducers";

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const rootpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const getUser = async (email: string, password: string, expiredDate: Date) => {
    //     try {
    //         const result = await mainApi.post(
    //             apiEndpoints.LOGIN,
    //             apiEndpoints.getLoginBody(email, password)
    //         );

    //         const currentUser = {
    //             token: result.data.token,
    //             id: result.data.id,
    //             email: result.data.email,
    //             password: result.data.password,
    //             expiredDate: expiredDate,
    //         }

    //         dispatch(login(currentUser));
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     const currentUser = localStorage.getItem("currentUser");

    //     if (currentUser) {
    //         const loggedUser = JSON.stringify(currentUser);
    //         console.log(loggedUser);
    //         const today = new Date();
    //         const expiredDate = new Date(loggedUser.expiredDate);

    //         if (today > expiredDate) {
    //             localStorage.removeItem("currentUser");
    //             navigate("/signin");
    //         }
    //         else{
    //             getUser(loggedUser.email, loggedUser.password, loggedUser.expiredDate);
    //         }
    //     }
    // }, []);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer/>

        </>
    )
}

export default rootpage