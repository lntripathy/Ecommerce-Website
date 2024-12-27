import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';


const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])

    const fetchAllUsers = async () => {
        const fetchData = await axios({
            url: SummaryApi.allUsers.url,
            method: SummaryApi.allUsers.method,
            withCredentials: true
        })

        const dataResponse = await fetchData.data

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.data)
        }


    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='bg-white pb-4'>
            <table className='w-full '>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        allUsers.map((el, index) => {
                            return (
                                <tr key={index} className='border-b-2'>
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    {/* <td>{moment(el?.createdAt).format('LL')}</td> */}
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                            onClick={() => {
                                                // setUpdateUserDetails(el)
                                                // setOpenUpdateRole(true)

                                            }}
                                        >
                                            {/* <MdModeEdit /> */}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers
