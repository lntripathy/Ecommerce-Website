import React from 'react'
import ROLE from '../common/role'
import { FaUserEdit, FaUserAlt, FaEnvelope, FaUserShield, FaSave } from 'react-icons/fa';


const ChangeUserRole = () => {
  return (
   <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-900 bg-opacity-50'>
    <div className='bg-white shadow-lg p-6 w-full max-w-sm rounded-lg'>
        {/* Modal Title */}
        <h1 className='pb-4 text-xl font-semibold text-gray-700 flex items-center gap-2'>
            <FaUserEdit className='text-blue-600' /> Change User Role
        </h1>

        {/* User Information */}
        <div className='mb-4 text-sm text-gray-600'>
            <p className='flex items-center gap-2'>
                <FaUserAlt className='text-gray-500' /> <span className='font-medium'>Name:</span> name
            </p>
            <p className='flex items-center gap-2 mt-2'>
                <FaEnvelope className='text-gray-500' /> <span className='font-medium'>Email:</span> email
            </p>
        </div>

        {/* Role Selection */}
        <div className='flex items-center justify-between my-4'>
            <p className='text-gray-700 font-medium'>Role:</p>
            <div className='flex items-center gap-2'>
                <FaUserShield className='text-green-500' />
                <select className='border border-gray-300 px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300'>
                    {Object.values(ROLE).map(el => (
                        <option value={el} key={el}>{el}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Submit Button */}
        <button className='w-full py-2 px-4 mt-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 transition-all duration-300'>
            <FaSave className='text-white' /> Change Role
        </button>
    </div>
</div>

  )
}

export default ChangeUserRole
