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
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import OrderPlaced from '../pages/OrderPlaced'


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
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:productId",
                element: <ProductDetails />
            },
            {
                path: "view-cart",
                element: <Cart />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "order",
                element: <OrderPlaced />
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
