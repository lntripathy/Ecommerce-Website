import React, { useEffect, useState } from 'react'
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { productCategory } from '../helpers/productCategory'
import SearchedProductDisplay from '../components/SearchedProductDisplay'
import axios from 'axios'
import SummaryApi from '../common'

const CategoryProduct = () => {

    const params = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    // error fixed
    const [selectCategory, setSelectCategory] = useState(() => {
        return productCategory.reduce((acc, category) => {
            acc[category.value] = urlCategoryListObject[category.value] || false;
            return acc;
        }, {});
    });
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    const fetchData = async () => {
        setLoading(true)
        const response = await axios({
            url: SummaryApi.filterProduct.url,
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            data: {
                category: filterCategoryList
            }
        })

        const responseData = await response.data
        setData(responseData?.data || [])
        setLoading(false)
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target

        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    // filtering the selected category
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categorykeyName => {
            if (selectCategory[categorykeyName]) {
                return categorykeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        // formating url to set in the url search bar 
        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            else {
                return `category=${el}&&`
            }
        })
        navigate(`/product-category?` + urlFormat.join(""))

    }, [selectCategory])


    // sorting of the products
    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === "asc") {
            setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
        }
        if (value === "dsc") {
            setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }


    return (

        <div className='capitalize'>
            <div className='container mx-auto p-6 bg-gray-50 '>

                {/* Desktop Version */}
                <div className='hidden lg:grid grid-cols-[250px,1fr] gap-4'>

                    {/* Left Side (Filters) */}
                    <div className='bg-white p-4 shadow-md rounded-lg min-h-[calc(100vh-120px)] overflow-y-auto'>
                        {/* Sort By Section */}
                        <div className='mb-6'>
                            <h3 className='text-base uppercase font-semibold text-gray-700 flex items-center gap-2'>
                                <FaSortAmountUpAlt className='text-pink-700' />
                                Sort by
                            </h3>
                            <form className='text-sm flex flex-col gap-3 mt-3'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type='radio'
                                        name='sortBy'
                                        checked={sortBy === "asc"}
                                        value={"asc"}
                                        id="low-to-high"
                                        className='cursor-pointer accent-blue-600'
                                        onChange={handleOnChangeSortBy}
                                    />
                                    <label htmlFor="low-to-high" className='cursor-pointer'>
                                        Price - Low to High
                                    </label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type='radio'
                                        name='sortBy'
                                        checked={sortBy === "dsc"}
                                        value={"dsc"}
                                        id="high-to-low"
                                        className='cursor-pointer accent-blue-600'
                                        onChange={handleOnChangeSortBy}
                                    />
                                    <label htmlFor="high-to-low" className='cursor-pointer'>
                                        Price - High to Low
                                    </label>
                                </div>
                            </form>
                        </div>

                        {/* Filter by Category */}
                        <div>
                            <h3 className='text-base uppercase font-semibold text-gray-700 flex items-center gap-2'>
                                <BiCategory className='text-pink-700' />
                                Category
                            </h3>
                            <form className='text-sm flex flex-col gap-3 mt-3'>
                                {productCategory.map((categoryName, index) => (
                                    <div className='flex items-center gap-3' key={index}>
                                        <input
                                            type='checkbox'
                                            name={"category"}
                                            value={categoryName?.value}
                                            id={categoryName?.value}
                                            checked={selectCategory[categoryName?.value]}
                                            onChange={handleSelectCategory}
                                            className='cursor-pointer accent-blue-600'
                                        />
                                        <label
                                            htmlFor={categoryName?.value}
                                            className='cursor-pointer'>
                                            {categoryName?.label}
                                        </label>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>

                    {/* Right Side (Products) */}
                    <div className='px-4'>
                        <p className='font-semibold text-gray-800 text-lg mb-4'>
                            Search Results: {data.length}
                        </p>

                        <div className='bg-white p-4 shadow-md rounded-lg min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-auto'>
                            {data.length !== 0 && !loading ? (
                                <SearchedProductDisplay data={data} />
                            ) : (
                                <>
                                    {/* <p className='text-center text-gray-500'>No Products Found.</p> */}
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
