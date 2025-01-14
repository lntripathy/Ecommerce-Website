import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import SummaryApi from '../common'
import SearchedProductDisplay from '../components/SearchedProductDisplay'
import { AiOutlineFrown } from 'react-icons/ai';

const SearchProduct = () => {

    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await axios(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.data
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [query])

    return (
        <div className='container mx-auto p-6 bg-gray-50 min-h-screen'>
            {/* Loading Indicator */}
            {loading && (
                <p className='text-lg text-pink-700 text-center flex items-center justify-center gap-2'>
                    <span className='animate-spin border-2 border-pink-700 border-t-transparent rounded-full w-5 h-5'></span>
                    Loading...
                </p>
            )}

            {/* Search Results Header */}
            <div className='text-lg font-semibold my-5 flex items-center justify-between'>
                <p>
                    <span className='text-blue-600'>Search Results:</span> {data.length}
                </p>
            </div>

            {/* No Data Found */}
            {data.length === 0 && !loading && (
                <div className='bg-white text-gray-600 text-lg text-center py-8 rounded-lg shadow-sm'>
                    <AiOutlineFrown className='mx-auto text-gray-400 mb-3' size={50} />
                    <p>No Data Found...</p>
                </div>
            )}

            {/* Display Search Results */}
            {data.length !== 0 && !loading && (
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <SearchedProductDisplay loading={loading} data={data} />
                </div>
            )}
        </div>

    )
}

export default SearchProduct
