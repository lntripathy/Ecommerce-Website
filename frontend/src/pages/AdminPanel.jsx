import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom'

const AdminPanel = () => {

  let user = {
    name: "John Doe",
    role: "Admin"
  }
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden my-1 relative'>


      {/* <img src={bgadmin} alt="" className='absolute h-full w-[30%]'/> */}
      <aside className='min-h-full w-full max-w-60 shadow-md bg-black text-white rounded-r-lg' >
        <div className='h-32  flex justify-center items-center flex-col'>
          <div className='text-5xl cursor-pointer relative flex justify-center'>
            {/* {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
              ) : (
                )
                } */}
                <FaCircleUser />
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
          </nav>
        </div>
      </aside>

      <main className=' bg-red-300 w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
