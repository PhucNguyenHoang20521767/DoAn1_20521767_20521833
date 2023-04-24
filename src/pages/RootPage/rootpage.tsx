import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const rootpage = () => {
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