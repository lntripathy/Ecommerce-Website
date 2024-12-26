import React from 'react'
import logo from '../assets/logo.png'
import { GrSearch } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {

    const user = useSelector(state => state?.user?.user)
    console.log("user from headers : ", user)

    return (
        <header className='h-16 shadow-md bg-grey-100 px-4'>
            <nav className='container mx-auto h-full flex items-center justify-between gap-1'>
                <div>
                    <Link to={"/"}>
                        <img src={logo} width={"160px"} height={"50px"} alt="" className='rounded-md' />
                    </Link>
                </div>


                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 bg-white'>
                    <input className='w-full outline-none ' type="text" placeholder='Search' />
                    <div className='text-lg min-w-[50px] h-8 bg-pink-700 hover:bg-pink-800 flex items-center justify-center text-white rounded-r-full'>
                        <GrSearch />
                    </div>
                </div>


                <div className='flex gap-7'>
                    {/* user logo */}
                    <Link to={"/admin-panel"}>
                        <div className='text-3xl cursor-pointer'>
                            {
                                user?.profilePic ? (
                                    <img src={user.profilePic} alt={user?.name} className='w-10 h-10 rounded-full'/>
                                ) : (<FaCircleUser />) 
                            }
                        </div>
                    </Link>

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
                    <div className='flex '>
                        <Link to={"login"} className='px-3 py-1 bg-pink-700 text-white rounded-full hover:bg-pink-800'>Login</Link>

                    </div>



                </div>
            </nav>
        </header>
    )
}

export default Header
