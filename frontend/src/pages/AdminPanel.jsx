import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import Context from '../context/Index';
import { useSelector } from 'react-redux';

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user)


    return (

        <div className='min-h-[calc(100vh-120px)] md:flex hidden my-1 relative bg-gray-50'>

            {/* Sidebar */}
            <aside className='min-h-full w-full max-w-60 shadow-lg bg-white'>
                {/* User Profile */}
                <div className='h-40 flex justify-center items-center flex-col bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-r-sm'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {user?.profilePic ? (
                            <img
                                src={user?.profilePic}
                                className='w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover'
                                alt={user?.name}
                            />
                        ) : (
                            <FaCircleUser />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold mt-2'>{user?.name || 'Name'}</p>
                    <p className='text-sm font-medium'>{user?.role || 'Role'}</p>
                </div>

                {/* Navigation */}
                <div className='p-4'>
                    <h2 className='text-gray-700 font-semibold mb-4 text-lg'>Dashboard Links</h2>

                    <nav className='grid gap-3'>
                        <Link
                            to={"all-users"}
                            className='px-3 py-2 hover:bg-green-100 rounded-md flex items-center gap-2 transition-all duration-200 border-2'
                        >
                            <span className='text-green-500 font-medium'>👤</span> All Users
                        </Link>
                        <Link
                            to={"all-products"}
                            className='px-3 py-2 hover:bg-green-100 rounded-md flex items-center gap-2 transition-all duration-200  border-2'
                        >
                            <span className='text-green-500 font-medium'>🛒</span> All Products
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className='w-full h-full p-4 bg-gray-100 rounded-l-lg'>
                <Outlet />
            </main>
        </div>

    )
}

export default AdminPanel
