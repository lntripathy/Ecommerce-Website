import React, { useState } from 'react'
import ROLE from '../common/Role'
import { FaUserEdit, FaUserAlt, FaEnvelope, FaUserShield, FaSave } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({name, email, role, userId, onClose, callFunc}) => {

    const [userRole, setUserRole] = useState(role)

    const handleOnChnageSelect = (e) => {
        setUserRole(e.target.value) 
    }

    // user update
    const updateUserRole = async () => {
        const fetchResponse = await axios({
            url: SummaryApi.updateUser.url,
            method: SummaryApi.updateUser.method,
            withCredentials: true,
            headers: {
                "content-Type": "application/json"
            },
            data: {
                userId: userId,
                role: userRole
            }
        })

        const responseData = await fetchResponse.data

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-900 bg-opacity-50'>
            <div className='bg-white shadow-lg p-6 w-full max-w-sm rounded-lg'>

                {/* close tag */}
                <button className='block ml-auto text-2xl hover:text-red-700' onClick={onClose}>
                    <IoMdClose />
                </button>


                {/* Modal Title */}
                <h1 className='pb-4 text-2xl font-semibold text-gray-700 flex items-center gap-2'>
                    <FaUserEdit className='text-blue-600' /> Change User Role
                </h1>

                {/* User Information */}
                <div className='mb-4 text-md text-gray-600'>
                    <p className='flex items-center gap-2'>
                        <FaUserAlt className='text-gray-500' /> <span className='font-medium'>Name:</span> {name}
                    </p>
                    <p className='flex items-center gap-2 mt-2'>
                        <FaEnvelope className='text-gray-500' /> <span className='font-medium'>Email:</span> {email}
                    </p>
                </div>

                {/* Role Selection */}
                <div className='flex items-center justify-between my-4'>
                    <p className='text-gray-700 font-medium'>Role:</p>
                    <div className='flex items-center gap-2'>
                        <FaUserShield className='text-green-500' />
                        <select className='border border-gray-300 px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300' value={userRole} onChange={handleOnChnageSelect}>
                            {Object.values(ROLE).map(el => (
                                <option value={el} key={el}>{el}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <button className='w-full py-2 px-4 mt-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 transition-all duration-300' onClick={updateUserRole}>
                    <FaSave className='text-white' /> Change Role
                </button>
            </div>
        </div>

    )
}

export default ChangeUserRole
