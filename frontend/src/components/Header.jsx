import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { GrSearch } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/Role';



const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)

    const navigate = useNavigate()


    // after logout 
    const handleLogout = async () => {
        const fetchData = await axios({
            url: SummaryApi.logout_user.url,
            method: SummaryApi.logout_user.method,
            withCredentials: true
        })

        const data = await fetchData.data

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate('/login')
        }
        if (data.error) {
            toast.error(data.message)
        }
    }

    return (
        <header className="h-16 shadow-md bg-white px-4 fixed w-full z-40 border-b border-gray-200">
            <nav className="container mx-auto h-full flex items-center justify-between gap-4">
                {/* Logo Section */}
                <div>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-10 sm:h-[57px] rounded-tl-2xl rounded-br-2xl hover:scale-105 transition-transform"
                        />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="hidden lg:flex items-center w-full justify-between max-w-lg border border-gray-300 rounded-full shadow-sm focus-within:shadow-md pl-3 bg-gray-50">
                    <input
                        className="w-full outline-none bg-transparent px-2 text-gray-700 placeholder-gray-500"
                        type="text"
                        placeholder="Search"
                    />
                    <div className="text-lg min-w-[50px] h-8 bg-pink-700 hover:bg-pink-800 flex items-center justify-center text-white rounded-r-full cursor-pointer">
                        <GrSearch />
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-6">
                    {/* User Profile */}
                    <div className="relative flex justify-center">
                        {user?._id && (
                            <div
                                className="text-3xl cursor-pointer flex justify-center"
                                onClick={() => setMenuDisplay((prev) => !prev)}
                            >
                                {user?.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt={user?.name}
                                        className="w-10 h-10 rounded-full border-2 border-pink-700 shadow-sm hover:shadow-md transition-shadow"
                                    />
                                ) : (
                                    <FaCircleUser className="text-black hover:text-blue-700 transition-colors" />
                                )}
                            </div>
                        )}

                        {menuDisplay &&
                            user?.role === ROLE.ADMIN && (
                                <div className="absolute top-10 -right-18 bg-white shadow-lg px-2 py-1 rounded-md z-50 border border-gray-200">
                                    <Link
                                        to="admin-panel/all-products"
                                        className="whitespace-nowrap hover:bg-green-200 rounded px-2 py-1 block  text-black"
                                        onClick={() => setMenuDisplay((prev) => !prev)}
                                    >
                                        Admin Panel
                                    </Link>
                                </div>
                            )}
                    </div>

                    {/* Cart Icon */}
                    <div className="text-3xl cursor-pointer relative">
                        <span>
                            <FaCartShopping className="text-black hover:text-blue-700 transition-colors" />
                        </span>
                        <div className="bg-red-700 text-white w-5 h-5 text-xs flex justify-center items-center rounded-full absolute -top-2 left-5 shadow-md">
                            0
                        </div>
                    </div>

                    {/* Login/Logout Button */}
                    <div>
                        {user?._id ? (
                            <Link
                                onClick={handleLogout}
                                className="px-4 py-1.5 bg-pink-700 text-white rounded-full hover:bg-pink-800 shadow-sm transition-colors"
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link
                                to="login"
                                className="px-4 py-1.5 bg-pink-700 text-white rounded-full hover:bg-pink-800 shadow-sm transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header
