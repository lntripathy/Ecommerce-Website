import React from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Login from '../pages/Login'
import Home from "../pages/Home"
import App from '../App'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },

                ]
            }
        ]
    },

])

const Routes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routes
