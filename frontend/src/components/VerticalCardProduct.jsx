import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategorywiseProduct'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import addToCart from '../helpers/addToCart';
import Context from '../context/Index';

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
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

    // fetching the cart 
    const { fetchUserCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className="container mx-auto flex flex-col md:block px-4 my-6 relative">
            {/* Heading */}
            <h2 className="text-2xl font-semibold py-4 text-gray-800">{heading}</h2>

            {/* Scrollable Product Section */}
            <div
                className="flex items-center gap-4 pb-1 md:gap-6 overflow-scroll scrollbar-hide"
                ref={scrollElement}
            >
                {/* Scroll Buttons */}
                <button
                    className="bg-gray-100 shadow-md rounded-full p-2 absolute -left-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 text-xl hidden md:flex items-center justify-center z-10"
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className="bg-gray-100 shadow-md rounded-full p-2 absolute -right-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 text-xl hidden md:flex items-center justify-center z-10"
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {/* Loading State */}
                {loading
                    ? loadingList.map((product, index) => (
                        <div
                            key={index}
                            className="w-full min-w-[280px] md:min-w-[300px] max-w-[320px] h-auto bg-white rounded-lg shadow-md flex flex-col animate-pulse overflow-hidden"
                        >
                            <div className="bg-gray-200 h-40 w-full"></div>
                            <div className="p-4 grid gap-3">
                                <div className="bg-gray-200 h-6 rounded-full"></div>
                                <div className="bg-gray-200 h-4 rounded-full"></div>
                                <div className="bg-gray-200 h-4 w-2/3 rounded-full"></div>
                            </div>
                        </div>
                    ))
                    : data.map((product, index) => (
                        <Link
                            to={`product/${product?._id}`}
                            key={index}
                            onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth'})}
                            className="w-full min-w-[280px] md:min-w-[300px] max-w-[320px] bg-white rounded-lg shadow-sm hover:shadow-md flex flex-col transition-shadow"
                        >
                            {/* Product Image */}
                            <div className="bg-gray-100 h-40 w-full rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    src={product.productImage[0]}
                                    alt={product.productName}
                                    className="object-contain h-full w-full hover:scale-110 transition-transform mix-blend-multiply"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="p-4 grid gap-3">
                                <h2 className="font-medium text-lg text-ellipsis line-clamp-2 text-gray-800">
                                    {product?.productName}
                                </h2>
                                <p className="text-sm capitalize text-gray-500">{product?.category}</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-green-700 font-medium">
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className="text-gray-400 line-through">
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>
                                <button
                                    className="text-sm bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 rounded-full"
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>

    )
}

export default VerticalCardProduct
