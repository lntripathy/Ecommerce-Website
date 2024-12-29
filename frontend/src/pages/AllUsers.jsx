import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
import moment from 'moment'
import { FaEdit } from 'react-icons/fa';
import ChangeUserRole from '../components/ChangeUserRole';



const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await axios({
            url: SummaryApi.allUsers.url,
            method: SummaryApi.allUsers.method,
            withCredentials: true
        })

        const dataResponse = await fetchData.data

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }
        if (dataResponse.error) {
            toast.error(dataResponse.data)
        }


    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
                {/* Table Header */}
                <thead>
                    <tr className='bg-gradient-to-r from-pink-700 to-pink-800 text-white text-sm uppercase font-bold tracking-wide'>
                        <th className='py-3 px-4 text-center'>Sr.</th>
                        <th className='py-3 px-4'>Name</th>
                        <th className='py-3 px-4'>Email</th>
                        <th className='py-3 px-4'>Role</th>
                        <th className='py-3 px-4'>Created Date</th>
                        <th className='py-3 px-4'>Created Time</th>
                        <th className='py-3 px-4'>Action</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody >
                    {allUsers.map((el, index) => (
                        <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-green-100 transition-colors duration-200`}
                        >
                            <td className='py-3 px-4 text-center font-semibold'>{index + 1}</td>
                            <td className='py-3 px-4 capitalize font-medium'>{el?.name}</td>
                            <td className='py-3 px-4'>{el?.email}</td>
                            <td
                                className={`py-3 px-4 font-semibold ${el?.role === 'ADMIN'
                                    ? 'text-red-500'
                                    : 'text-gray-700'
                                    }`}
                            >
                                {el?.role}
                            </td>
                            <td className='py-3 px-4'>{moment(el?.createdAt).format('LL')}</td>
                            <td className='py-3 px-4'>{moment(el?.createdAt).format('LT')}</td>
                            <td className='py-3 px-4 text-center'>
                                
                                <button
                                    className='p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-red-500 transition-all duration-100' 
                                    onClick={() => {
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)
                                    }}
                                >
                                    <FaEdit className='text-lg' />
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>


            {
                openUpdateRole && (
                    <ChangeUserRole 
                        onClose={() => setOpenUpdateRole(false)} 
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        // to refresh the page
                        callFunc = {fetchAllUsers}
                     />
                )
            }
        </div>

    )
}

export default AllUsers
