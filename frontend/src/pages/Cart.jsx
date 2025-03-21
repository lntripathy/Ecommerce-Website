import React, { useContext, useEffect, useState } from 'react'
import displayINRCurrency from '../helpers/displayCurrency'
import axios from 'axios'
import SummaryApi from '../common'
import Context from '../context/Index'
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'



const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
    const navigate = useNavigate()

    const fetchData = async () => {
        const response = await axios({
            url: SummaryApi.cartView.url,
            method: SummaryApi.cartView.method,
            withCredentials: true,
            header: {
                "content-type": "application/json"
            },
        })
        const responseData = await response.data

        if (responseData.success) {
            setData(responseData.data)
        }
    }


    // fixing the cart loading issue
    const handleLoading = async () => {
        setLoading(true)
        await fetchData()
        setLoading(false)

    }
    useEffect(() => {
        handleLoading()
        loadScript('https://checkout.razorpay.com/v1/checkout.js')
    }, [])

    // increase quantity
    const increaseQty = async (name, id, qty) => {
        const response = await axios({
            url: SummaryApi.updateCartCount.url,
            method: SummaryApi.updateCartCount.method,
            withCredentials: true,
            header: {
                "content-type": "application/json"
            },
            data: {
                productName: name,
                _id: id,
                quantity: qty + 1
            }
        })
        const responseData = await response.data


        if (responseData.success) {
            fetchData()
            toast.success(responseData.message)
        }
    }

    // decrease quantity
    const decreaseQty = async (name, id, qty) => {
        if (qty > 1) {

            const response = await axios({
                url: SummaryApi.updateCartCount.url,
                method: SummaryApi.updateCartCount.method,
                withCredentials: true,
                header: {
                    "content-type": "application/json"
                },
                data: {
                    productName: name,
                    _id: id,
                    quantity: qty - 1
                }
            })
            const responseData = await response.data


            if (responseData.success) {
                fetchData()
                toast.success(responseData.message)
            }
        }
    }

    // deleting cart product
    const deleteCartProduct = async (name, id) => {
        const response = await axios({
            url: SummaryApi.deleteCartProduct.url,
            method: SummaryApi.deleteCartProduct.method,
            withCredentials: true,
            header: {
                "content-type": "application/json"
            },
            data: {
                productName: name,
                _id: id,
            }
        })
        const responseData = await response.data

        if (responseData.success) {
            fetchData()
            context.fetchUserCart()
            toast.info(responseData.message)
        }
    }


    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalMRP = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity * currentValue?.productId?.price, 0)
    const totalPrice = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity * currentValue?.productId?.sellingPrice, 0)


    // handle payment
    const handlePayment = async () => {

        navigate('/payment')
        const response = await axios({
            url: SummaryApi.payment.url,
            method: SummaryApi.payment.method,
            withCredentials: true,
            header: {
                "content-type": "application/json"
            },
            data: { totalPrice }
        })

        const responseData = await response.data
        navigate('/view-cart')

        const paymentObject = new window.Razorpay({
            key: "rzp_test_hwbvlwxXK9D2ey",
            order_id: responseData.data.id,
            ...data,
            handler: function (response) {
                const options = {
                    order_id: responseData.data.id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                }

                axios.post(SummaryApi.verifyPayment.url, options)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success("Transaction Complete! Your order is on the way.")
                            navigate('/order')
                        }
                        else{
                            toast.error("Something went Wrong")
                            console.log("error why")
                        }
                    })
            }

        })
        paymentObject.open()

    }


    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                resolve(true); // already loaded
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(false);
            document.body.appendChild(script);
        });
    };


    return (
        <div className='container mx-auto'>

            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-around p-4'>
                {/* view product */}
                <div className='w-full max-w-3xl '>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => {
                                return (
                                    <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-36 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data?.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-44 md:h-40 my-2 border border-slate-300  rounded-md shadow-sm hover:shadow-md grid grid-cols-[140px,1fr]'>
                                        <Link
                                            to={`../product/${product?.productId?._id}`}
                                            className='w-36 h-44 md:h-40 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply p-1 hover:scale-105 transition-all' />
                                        </Link>
                                        <div className='p-4 flex flex-col md:gap-1 relative'>

                                            <div className='absolute right-2 top-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                                                onClick={() => deleteCartProduct(product?.productId?.productName, product?._id)}
                                            >
                                                <MdDelete />
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 w-[90%]'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-pink-700'>{product?.productId.category}</p>
                                            <div className='flex items-center justify-between'>

                                                <div className='flex flex-wrap items-center gap-1 md:gap-3'>
                                                    {product?.productId?.price > product?.productId?.sellingPrice && (
                                                        <p className='text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full'>
                                                            {Math.round(((product?.productId?.price - product?.productId?.sellingPrice) / product?.productId?.price) * 100)}% OFF
                                                        </p>
                                                    )}
                                                    <p className='text-gray-400 line-through text-xs md:tex-sm md:font-medium'>{displayINRCurrency(product?.productId?.price)}</p>
                                                    <p className='text-black font-medium md:text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                </div>

                                                <p className='text-green-600 font-bold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                {
                                                    (product?.quantity === 1) ? (<button className='border border-gray-500 text-gray-500 w-6 h-6 flex justify-center items-center rounded-full'
                                                    >-</button>) :
                                                        (<button className='border border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white w-6 h-6 flex justify-center items-center rounded-full'
                                                            onClick={() => decreaseQty(product?.productId?.productName, product?._id, product?.quantity)}
                                                        >-</button>)}
                                                < span > {product?.quantity}</span>

                                                <button className='border border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white w-6 h-6 flex justify-center items-center rounded-full'
                                                    onClick={() => increaseQty(product?.productId?.productName, product?._id, product?.quantity)}
                                                >+</button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        )
                    }
                </div>


                {/* summary  */}
                {
                    data[0] && (

                        <div className='w-full lg:max-w-lg'>
                            {loading ? (
                                <div className='h-40 bg-slate-200 border border-slate-300 animate-pulse rounded-lg'></div>
                            ) : (
                                <div className='bg-white border border-slate-300 rounded-lg shadow-sm'>
                                    <h2 className='bg-pink-700 text-white text-lg font-medium px-4 py-2 rounded-t-lg'>
                                        Summary
                                    </h2>
                                    <div className='px-4 py-2'>
                                        <div className='flex items-center justify-between text-gray-700 font-medium'>
                                            <p>Quantity</p>
                                            <p>{totalQty}</p>
                                        </div>
                                        <div className='flex items-center justify-between text-gray-700 font-medium mt-3'>
                                            <p>MRP</p>
                                            <p>{displayINRCurrency(totalMRP)}</p>
                                        </div>
                                        <div className='flex items-center justify-between text-gray-700 font-medium mt-3'>
                                            <p>Discount</p>
                                            <p className='text-green-500'>-{displayINRCurrency(totalMRP - totalPrice)}</p>
                                        </div>
                                        <div className='flex items-center justify-between text-gray-700 font-medium mt-3'>
                                            <p>Delivery Charges</p>
                                            <p className='flex gap-2'>
                                                <span className='line-through font-medium text-gray-400'>{displayINRCurrency(50)}</span>
                                                <span className='text-green-500'>FREE</span>
                                            </p>

                                        </div>

                                        <div className='flex items-center justify-between text-black text-lg font-semibold my-7'>
                                            <p>Total Price</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>
                                        <p className='font-medium text-gray-700'>You will save <span className='text-green-500 font-bold'>{displayINRCurrency(totalMRP - totalPrice)}</span> on this order</p>
                                    </div>
                                    <button className='bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-b-lg transition-colors duration-200 on' onClick={handlePayment}>
                                        Proceed to Payment
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Cart
