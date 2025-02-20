import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import axios from 'axios'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaStar, FaStarHalf } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import Context from '../context/Index'
import addToCart from '../helpers/addToCart'

const ProductDetails = () => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage, setZoomImage] = useState(false)
    const navigate = useNavigate()


    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await axios({
            url: SummaryApi.productDetails.url,
            method: SummaryApi.productDetails.method,
            header: {
                "content-type": "application/json"
            },
            data: {
                productId: params?.productId
            }
        })
        setLoading(false)
        const dataResponse = response.data
        const realData = dataResponse?.data
        setData(realData)
        setActiveImage(realData?.productImage[0])
    }


    useEffect(() => {
        fetchProductDetails()
    }, [params])

    const handleMouseEnterProduct = (imgURL) => {
        setActiveImage(imgURL)
    }

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({ x, y })
    }, [zoomImageCoordinate])

    const handleZoomOutImage = () => {
        setZoomImage(false)
    }

    // add to cart
    const { fetchUserCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserCart()
    }

    // handle buy product
    const handleBuyProduct= async (e, id) => {
        await addToCart(e, id)
        fetchUserCart()
        navigate('/view-cart')
    }

    return (
        <div className='container mx-auto p-4'>

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-6'>
                {/* Product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-6'>

                    <div className='h-[300px] w-full lg:h-96 lg:w-96 bg-slate-200 relative p-1 rounded-md'>
                        <img
                            src={activeImage}
                            className='h-full w-full object-scale-down mix-blend-multiply rounded-md hover:cursor-crosshair'
                            onMouseMove={handleZoomImage}
                            onMouseLeave={handleZoomOutImage}
                        />

                        {/* Product Zoom */}
                        {
                            zoomImage && (
                                <div
                                    className='hidden lg:block absolute min-w-[750px] overflow-hidden max-h-[600px] bg-slate-200 p-1 rounded-md -right-[775px] top-0 shadow-lg z-10'>
                                    <div
                                        className='w-full h-full rounded-md min-h-[500px] min-w-[750px] mix-blend-multiply '
                                        style={{
                                            backgroundImage: `url(${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
                                            backgroundSize: '250%'
                                        }}
                                    >
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    {/* Product Side Images */}
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageListLoading.map((el, index) => (
                                            <div
                                                className='h-20 w-20 bg-slate-200 rounded animate-pulse'
                                                key={'loadingImage' + index}>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-hide h-full'>
                                    {
                                        data?.productImage?.map((imgURL, index) => (
                                            <div
                                                className='h-20 w-20 bg-slate-200 rounded-md p-1 hover:shadow-md hover:border hover:border-pink-700 transition-shadow cursor-pointer'
                                                key={imgURL}>
                                                <img
                                                    src={imgURL}
                                                    className='w-full h-full object-scale-down mix-blend-multiply rounded-md'
                                                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                                                    onClick={() => handleMouseEnterProduct(imgURL)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Product Details */}
                {
                    loading ? (
                        <div className='grid gap-3 w-full'>
                            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'></p>
                            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full rounded-full'></h2>
                            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full rounded-full'></p>

                            <div className='text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full rounded-full'></div>

                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                                <p className='text-red-600 bg-slate-200 w-full rounded-full'></p>
                                <p className='text-slate-400 line-through bg-slate-200 w-full rounded-full'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2 w-full'>
                                <button className='h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full'></button>
                                <button className='h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full'></button>
                            </div>

                            <div className='w-full'>
                                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full'></p>
                                <p className='bg-slate-200 rounded-md animate-pulse h-10 lg:h-12 w-full'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-3'>
                            <p className='bg-pink-100 text-pink-700 px-3 rounded-full inline-block w-fit'>{data?.brandName}</p>
                            <h2 className='text-2xl lg:text-4xl font-medium text-gray-800'>{data?.productName}</h2>
                            <p className='capitalize text-gray-500'>{data?.category}</p>

                            <div className='text-green-700 flex items-center gap-1'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                                <span className='ml-2 text-sm text-pink-700 font-bold flex items-center gap-1 border border-pink-700 rounded-full px-2 hover:bg-pink-700 hover:text-white transition-colors duration-100'>
                                <MdVerified  className=''/>
                                    Verified
                                </span>
                            </div>

                            <div className='flex items-center gap-4 text-2xl lg:text-3xl font-medium my-1'>
                                <p className='text-pink-700'>{displayINRCurrency(data.sellingPrice)}</p>
                                <p className='text-gray-400 line-through text-xl'>{displayINRCurrency(data.price)}</p>
                                {data.price > data.sellingPrice && (
                                    <p className='text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full'>
                                        {Math.round(((data.price - data.sellingPrice) / data.price) * 100)}% OFF
                                    </p>
                                )}

                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button
                                    className='border-2 border-pink-700 rounded-md px-4 py-2 min-w-[120px] text-pink-700 font-medium hover:bg-pink-700 hover:text-white transition-colors duration-100' onClick={(e) => handleBuyProduct(e, data?._id)}>
                                    Buy
                                </button>
                                <button
                                    className='border-2 border-pink-700 rounded-md px-4 py-2 min-w-[120px] font-medium text-white bg-pink-700 hover:text-pink-700 hover:bg-white transition-colors duration-100'
                                    onClick={(e) => handleAddToCart(e, data?._id)}>
                                    Add To Cart
                                </button>
                            </div>

                            <div>
                                <p className='text-gray-600 font-medium my-1'>Description:</p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>


            {
                data?.category && (
                    <>
                        <CategoryWiseProductDisplay category={data?.category} heading={"Recomended Products"} />
                    </>

                )
            }

        </div>
    )
}

export default ProductDetails
