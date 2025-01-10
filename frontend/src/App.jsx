import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import SummaryApi from './common';
import Context from './context/Index';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {
    const dispatch = useDispatch()
    const [ cartProductCount, setCartProductCount ] = useState(0)

// fetching user details
    const fetchUserDetails = async () => {
        const dataResponse = await axios({
            url: SummaryApi.current_user.url,
            method: SummaryApi.current_user.method,
            withCredentials: true,
        })

        const dataApi = await dataResponse.data

        if (dataApi.success) {
            dispatch(setUserDetails(dataApi.data))
        }

    }

// fetching Cart details
    const fetchUserCart = async () => {
        const dataResponse = await axios({
            url: SummaryApi.countCartProduct.url,
            method: SummaryApi.countCartProduct.method,
            withCredentials: true,
        })

        const dataApi = await dataResponse.data

        setCartProductCount(dataApi?.data?.count)

    }


    useEffect(() => {
        fetchUserDetails()
        fetchUserCart()
    }, [])

    return (
        <>
            <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchUserCart }}>
                <ToastContainer position="bottom-right"/>

                <Header />
                <main className='min-h-[calc(100vh-120px)] pt-16'>
                    <Outlet />
                </main>
                <Footer className=''/>
            </Context.Provider>
        </>
    )
}

export default App
