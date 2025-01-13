import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import SummaryApi from '../common'
import SearchedProductDisplay from '../components/SearchedProductDisplay'

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
        <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-500'>Powered by Search</p>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-blue-600'
                viewBox='0 0 20 20'
                fill='currentColor'
            >
                <path
                    fillRule='evenodd'
                    d='M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z'
                    clipRule='evenodd'
                />
            </svg>
        </div>
    </div>

    {/* No Data Found */}
    {data.length === 0 && !loading && (
        <div className='bg-white text-gray-600 text-lg text-center py-8 rounded-lg shadow-sm'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 mx-auto text-gray-400 mb-3'
                viewBox='0 0 20 20'
                fill='currentColor'
            >
                <path
                    fillRule='evenodd'
                    d='M4 8a4 4 0 118 0 4 4 0 01-8 0zm7 4a6.002 6.002 0 00-5.996 5.775A8.001 8.001 0 1012 11a5.978 5.978 0 00-1 .086 6.003 6.003 0 00-.993-7.998A8.002 8.002 0 0116 13c.001.512.2.995.547 1.336C16.793 14.27 17 14.764 17 15.28v2.492a8.004 8.004 0 01-5.776-5.997A6.005 6.005 0 0016 13h1c0-4.42-3.58-8-8-8S1 8.58 1 13h1a6.003 6.003 0 005.993 5.774A8.004 8.004 0 0112 11a5.978 5.978 0 00-1 .086z'
                    clipRule='evenodd'
                />
            </svg>
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
