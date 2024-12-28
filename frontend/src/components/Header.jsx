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
        <header className='h-16 shadow-md bg-grey-100 px-4'>
            <nav className='container mx-auto h-full flex items-center justify-between gap-1'>
                <div className=''>
                    <Link to={"/"}>
                        <img src={logo} alt="" className='h-10 sm:h-[57px] rounded-tl-2xl rounded-br-2xl' />
                    </Link>
                </div>


                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 bg-white'>
                    <input className='w-full outline-none ' type="text" placeholder='Search' />
                    <div className='text-lg min-w-[50px] h-8 bg-pink-700 hover:bg-pink-800 flex items-center justify-center text-white rounded-r-full'>
                        <GrSearch />
                    </div>
                </div>


                <div className='flex items-center gap-5'>

                    {/* user logo */}
                    <div className='relative flex justify-center'>

                        {
                            user?._id && (
                                <div className='text-3xl cursor-pointer flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                                    {
                                        user?.profilePic ? (
                                            <img src={user.profilePic} alt={user?.name} className='w-10 h-10 rounded-full ' />
                                        ) : (<FaCircleUser />)
                                    }
                                </div>)

                        }


                        {
                            menuDisplay && (

                                user?.role === ROLE.ADMIN && (
                                    <div className=' absolute top-10 bg-white shadow-md px-2 py-1 rounded-md hidden md:block z-10'>

                                        <Link to={"admin-panel/all-products"}
                                            className='whitespace-nowrap hover:bg-green-200 rounded px-1 '
                                            onClick={() => setMenuDisplay(prev => !prev)}
                                        >Admin Panel</Link>
                                    </div>

                                )


                            )
                        }


                    </div>


                    {/* cart logo */}
                    <div className='text-3xl cursor-pointer relative'>
                        <span>
                            <FaCartShopping />
                        </span>
                        <div className='bg-red-700 text-white w-5 h-5 p-1 flex justify-center rounded-full items-center absolute -top-2 left-4'>
                            <p className='text-sm'>
                                0
                            </p>
                        </div>
                    </div>

                    {/* buttons */}
                    <div className='flex items-center'>

                        {
                            user?._id ? (
                                <Link onClick={handleLogout} className='px-3 py-1 bg-pink-700 text-white rounded-full hover:bg-pink-800'>Logout</Link>
                            ) : (
                                <Link to={"login"} className='px-3 py-1 bg-pink-700 text-white rounded-full hover:bg-pink-800'>Login</Link>
                            )
                        }

                    </div>



                </div>
            </nav>
        </header>
    )
}

export default Header
