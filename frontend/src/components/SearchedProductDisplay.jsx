import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context/Index'


const SearchedProductDisplay = ({loading, data=[]}) => {

    const loadingList = new Array(13).fill(null)

    // fetch the cart 
    const { fetchUserCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserCart()
    }

    return (
        <div
            className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:gap-6"
        >
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
                        to={`../product/${product?._id}`}
                        key={index}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg flex flex-col transition-shadow"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        {/* Product Image */}
                        <div className="bg-gray-100 h-40 w-full flex items-center justify-center overflow-hidden">
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
    )
}

export default SearchedProductDisplay