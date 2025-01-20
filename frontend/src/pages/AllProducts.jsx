import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import axios from 'axios'
import AdminProductCard from '../components/AdminProductCard'
import { MdAddCircle } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";


const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])

    const [loading, setLoading] = useState(false)


    const fetchAllProduct = async () => {
        setLoading(true)
        const response = await axios(SummaryApi.allProduct.url)
        const dataResponse = await response.data
        setLoading(false)
        setAllProduct(dataResponse?.data || [])

    }

    useEffect(() => {
        fetchAllProduct()
    }, [])      // component renders -> function calls

    return (
        <div>
            {/* Header Section */}
            {
                loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        {/* Spinner Icon */}
                        <div className="animate-spin text-blue-500 text-4xl mb-4">
                            <FaSpinner />
                        </div>
                        {/* Loading Text */}
                        <p className="text-lg font-semibold text-gray-600 animate-pulse">
                            Loading, please wait...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className='bg-white py-3 px-6 flex justify-between items-center shadow-md border-b border-gray-300'>
                            <h2 className='font-bold text-xl text-gray-800'>All Products</h2>
                            <button
                                className='border-2 border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white transition-all py-2 px-4 rounded-full flex items-center gap-2'
                                onClick={() => setOpenUploadProduct(true)}
                            >
                                <span className='text-lg'>
                                    <MdAddCircle />
                                </span>
                                Upload Product
                            </button>
                        </div>

                        {/* Product Grid Section */}
                        <div className='flex flex-wrap gap-6 py-6 px-4 h-[calc(100vh-190px)] overflow-y-scroll bg-gray-50'>
                            {
                                allProduct.map((product, index) => {
                                    return (
                                        <AdminProductCard data={product} key={index + "allProduct"} fetchData={fetchAllProduct} />
                                    );
                                })
                            }
                        </div>
                    </>

                )
            }

            {/* Upload Product Component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
                )
            }
        </div>

    )
}

export default AllProducts