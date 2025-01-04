import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategorywiseProduct'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import addToCart from '../helpers/addToCart';

const HorizontalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const scrollLeft = () => {
        scrollElement.current.scrollBy({
            left: -340,
            behavior: "smooth",
        });
    }
    const scrollRight = () => {
        scrollElement.current.scrollBy({
            left: 340,
            behavior: "smooth",
        });
    }

    const fetchData = async () => {
        // setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        console.log(categoryProduct)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            {/* Heading */}
            <h2 className='text-2xl font-semibold py-4 text-gray-800'>{heading}</h2>

            {/* Scrollable Product Section */}
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-hide  ' ref={scrollElement}>
                {/* Scroll Buttons */}
                <button
                    className='bg-gray-100 shadow-md rounded-full p-2 absolute left-0 text-gray-700 hover:text-gray-900 hover:bg-gray-200 text-xl hidden md:flex items-center justify-center z-10'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-gray-100 shadow-md rounded-full p-2 absolute right-0 text-gray-700 hover:text-gray-900 hover:bg-gray-200 text-xl hidden md:flex items-center justify-center z-10'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {/* Loading State */}
                {loading
                    ? loadingList.map((product, index) => {
                        return (
                            <div
                                key={index}
                                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex animate-pulse'
                            >
                                <div className='bg-gray-200 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-l-md'></div>
                                <div className='p-4 grid w-full gap-2'>
                                    <div className='bg-gray-200 h-4 rounded-full'></div>
                                    <div className='bg-gray-200 h-3 rounded-full'></div>
                                    <div className='flex gap-3'>
                                        <div className='bg-gray-200 h-3 w-1/2 rounded-full'></div>
                                        <div className='bg-gray-200 h-3 w-1/3 rounded-full'></div>
                                    </div>
                                    <div className='bg-gray-200 h-6 w-full rounded-full'></div>
                                </div>
                            </div>
                        );
                    })
                    : data.map((product, index) => {
                        return (
                            <Link
                                to={`product/${product?._id}`}
                                key={index}
                                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex hover:shadow-lg transition-shadow'
                            >
                                {/* Product Image */}
                                <div className='bg-gray-100 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-l-md flex items-center'>
                                    <img
                                        src={product.productImage[0]}
                                        alt={product.productName}
                                        className='object-contain h-full w-full hover:scale-110 transition-transform'
                                    />
                                </div>

                                {/* Product Details */}
                                <div className='p-4 grid gap-1'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800'>
                                        {product?.productName}
                                    </h2>
                                    <p className='text-sm capitalize text-gray-500'>{product?.category}</p>
                                    <div className='flex items-center gap-3'>
                                        <p className='text-green-700 font-medium'>
                                            {displayINRCurrency(product?.sellingPrice)}
                                        </p>
                                        <p className='text-gray-400 line-through'>
                                            {displayINRCurrency(product?.price)}
                                        </p>
                                    </div>
                                    <button
                                        className='text-sm bg-pink-700 hover:bg-pink-800 text-white px-3 py-1 rounded-full'
                                        onClick={(e) => addToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>

    )
}

export default HorizontalCardProduct
